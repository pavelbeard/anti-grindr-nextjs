import { Message } from "@/app/generated/prisma";
import { PAGE_SIZE } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";

export default function useChatMessages(chatId: string) {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(PAGE_SIZE);
  const [stopLoading, setStopLoading] = useState(false);

  const loadInitialMessages = async (chatId: string) => {
    if (!chatId) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/chat/${chatId}/messages?offset=0&limit=${PAGE_SIZE}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setMessages(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

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

  const loadPreviousMessages = async () => {
    if (!chatId || stopLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/chat/${chatId}/messages?offset=${offset}&limit=${PAGE_SIZE}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setMessages((prev) => [...prev, ...data]);
      setOffset((prev) => prev + PAGE_SIZE);
      if (data.length < PAGE_SIZE) {
        setStopLoading(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!chatId) return;
    // 1. Initial fetch of messages for the chat
    fetch(`/api/chat/${chatId}/messages?offset=0&limit=${PAGE_SIZE}`, {
      method: "GET",
    })
      .then((r) => r.json())
      .then((data: Message[]) => setMessages(data))
      .catch((error) => {
        console.error("Error fetching chat messages:", error);
      });

    // 2. SSE subscription for real-time updates
    const eventSource = new EventSource(`/api/chat/${chatId}/messages/stream`);
    eventSource.onmessage = (e) => {
      try {
        const newMessages: Message[] = JSON.parse(e.data);
        setMessages((prev) => {
          if (!newMessages.length) return prev;

          // Check if the last message in the previous state is the same as the last new message
          const lastPrev = prev[prev.length - 1];
          // If the last message in the previous state is the same as the last new message, we don't add it again
          const lastNew = newMessages[newMessages.length - 1];

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

    return () => {
      eventSource.close();
    };
  }, [chatId]);

  useEffect(() => {
    // 3. Scroll event listener to load previous messages
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop === 0) {
        loadPreviousMessages();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [chatId, offset]);

  return {
    error,
    isLoading,
    messages,
    messagesContainerRef,
    lastMessageRef,
    loadInitialMessages,
    scrollToBottom,
    loadPreviousMessages,
  };
}
