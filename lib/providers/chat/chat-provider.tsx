"use client";

import { createContext, use, useEffect, useRef, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Message } from "../../api/member/chat/chat.types";
import { PAGE_SIZE } from "../../constants";

type ChatContextType = {
  isChatModalOpen: boolean;
  isChatModalMinimized: boolean;
  error: any;
  chatId: string | null;
  userB: string | null;
  isLoading: boolean;
  openChat: (userId: string) => void; // userB id
  closeChat: () => void;
  minimizeChat: () => void;
  maximizeChat: () => void;
  messages: Message[];
};

type ResponseData = {
  chatId: string;
};

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isChatModalOpen, setIsChatModalOpen] = useLocalStorage(
    "isChatModalOpen",
    false
  );
  const [isChatModalMinimized, setIsChatModalMinimized] = useLocalStorage(
    "isChatModalMinimized",
    false
  );

  // Chat states
  const [userB, setUserB] = useLocalStorage<string | null>("userB", null);
  const [chatId, setChatId] = useLocalStorage<string | null>("chatId", null);

  console.log("UserB:", userB);

  // Messages state
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // Track how many messages we've loaded for pagination
  const [offset, setOffset] = useState(PAGE_SIZE);
  // Flag to stop loading more messages if butch size is smaller than PAGE_SIZE
  const [stopLoading, setStopLoading] = useState(false);

  const getOrCreateChat = async (userB: string) => {
    if (!userB) throw new Error("UserB is required to get or create a chat");

    try {
      setIsLoading(true);
      // 1. Try to get the chat with the userB

      const privateChatResponse = await fetch(
        `/api/chat/between?userB=${userB}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!privateChatResponse.ok) {
        const newChatResponse = await fetch(
          `/api/chat/between?userB=${userB}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!newChatResponse.ok) {
          throw new Error("Failed to create chat");
        }

        const { chatId: createdChatId } =
          (await newChatResponse.json()) as ResponseData;
        // If the chat was created successfully, set the chatId in the state

        setChatId(createdChatId);
      }

      const { chatId: existingChatId } =
        (await privateChatResponse.json()) as ResponseData;
      setChatId(existingChatId);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Failed to get or create chat"));
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const openChat = async (userId: string) => {
    // 1. Set userB to the userId of the person we want to chat with
    setUserB(userId);
    // 2. Get or create the chat with the userB
    await getOrCreateChat(userId);
    // 3. Open the chat modal
    setIsChatModalOpen(true);
  };
  const closeChat = () => setIsChatModalOpen(false);
  const maximizeChat = () => setIsChatModalMinimized(false);
  const minimizeChat = () => setIsChatModalMinimized(true);

  // Messages functions
  const scrollToBottom = () => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    }, 100);
  };

  useEffect(() => {
    if (!chatId) return;

    // 1. Initial fetching messages for the current chat
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/chat/${chatId}/messages?offset=0&limit=20`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Failed to load messages"));
        }
      } finally {
        setIsLoading(false);
      }
    })();

    // 2. SSE subscription for real-time updates
    const eventSource = new EventSource(`/api/chat/${chatId}/stream`);
    eventSource.onmessage = (e) => {
      try {
        const newMessages: Message[] = JSON.parse(e.data);
        setMessages((prev) => {
          if (!newMessages.length) return prev;

          // Check if the last message in the previous state is the same as the last new message
          const lastPrev = prev[prev.length - 1];
          // If the last message in the previous state is the same as the last new message, we don't add it again
          const lastNew = newMessages[newMessages.length - 1];

          // If the last message in the previous state is not the same as the last new message, we scroll to the bottom
          // and add the new messages to the list
          if (!lastPrev || lastPrev.createdAt !== lastNew.createdAt) {
            // Scroll to the bottom of the messages container
            scrollToBottom();
            // Only add new messages that aren't already in the list
            return [
              ...prev,
              ...newMessages.filter(
                (m) => !prev.some((pm) => pm.createdAt === m.createdAt)
              ),
            ];
          }
          return prev;
        });
      } catch (error) {
        console.error("Error parsing SSE data:", error);
      }
    };
  }, [chatId]);

  // 3. Scroll event listener to load previous messages
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (chatId && container.scrollTop === 0 && !stopLoading) {
        (async () => {
          try {
            setIsLoading(true);
            const response = await fetch(
              `/api/chat/${chatId}/messages?offset=${offset}&limit=${PAGE_SIZE}`,
              {
                method: "GET",
              }
            );
            const prevMessages: Message[] = await response.json();
            setMessages((currentMessages) => [
              ...prevMessages,
              ...currentMessages,
            ]);
            setOffset((currentOffset) => currentOffset + PAGE_SIZE);

            if (prevMessages.length < PAGE_SIZE) {
              // If the number of messages fetched is less than PAGE_SIZE, stop loading more
              setStopLoading(true);
            }
          } catch (err) {
            if (err instanceof Error) {
              setError(err);
            } else {
              setError(new Error("Failed to load previous messages"));
            }
          } finally {
            setIsLoading(false);
          }
        })();
      }
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    };
  }, [chatId, offset]);

  return (
    <ChatContext.Provider
      value={{
        isChatModalOpen,
        isChatModalMinimized,
        error,
        isLoading,
        chatId,
        userB,
        openChat,
        closeChat,
        minimizeChat,
        maximizeChat,
        messages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => {
  const context = use(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
