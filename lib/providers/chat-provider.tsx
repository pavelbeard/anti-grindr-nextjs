"use client";

import { createContext, use, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useLocalStorage from "../hooks/useLocalStorage";
import { useMessageStream } from "../hooks/message/useMessageStream";
import { useChatOperations } from "../hooks/useChatOperations";
import { Message } from "../data/chat/chat.types";
import { PAGE_SIZE } from "../constants";

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
  scrollToBottom: () => void;
  lastMessageRef?: React.RefObject<HTMLDivElement>;
  messagesContainerRef?: React.RefObject<HTMLDivElement>;
  setMessages?: (messages: Message[]) => void;
};

const ChatContext = createContext<ChatContextType | null>(null);

const fetchMessages = async ({
  chatId,
  offset = 0,
  limit = PAGE_SIZE,
}: {
  chatId: string;
  offset?: number;
  limit?: number;
}) => {
  const response = await fetch(
    `/api/chat/${chatId}/messages?offset=${offset}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }
  return response.json();
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

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

  // Refs
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // Custom hooks
  const { getOrCreateChat } = useChatOperations();

  // Use React Query for messages
  const {
    data: messages = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["chatMessages", chatId],
    queryFn: () => fetchMessages({ chatId: chatId! }),
    enabled: !!chatId,
  });

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

  // Use custom hook for SSE message streaming
  useMessageStream({ chatId, scrollToBottom });

  const openChat = async (userId: string) => {
    // 1. Set userB to the userId of the person we want to chat with
    setUserB(userId);
    // 2. Get or create the chat with the userB
    const chatId = await getOrCreateChat(userId);
    setChatId(chatId);
    // 3. Open the chat modal
    setIsChatModalOpen(true);
  };

  const closeChat = () => setIsChatModalOpen(false);
  const maximizeChat = () => setIsChatModalMinimized(false);
  const minimizeChat = () => setIsChatModalMinimized(true);

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
        scrollToBottom,
        lastMessageRef: lastMessageRef as React.RefObject<HTMLDivElement>,
        messagesContainerRef:
          messagesContainerRef as React.RefObject<HTMLDivElement>,
        // setMessages: (messages: Message[]) => {
        //   queryClient.setQueryData(["chatMessages", chatId], messages);
        // },
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
