import { Message } from "@/lib/api/member/chat/chat.types";
import { useEffect, useRef, useState } from "react";

const PAGE_SIZE = 20;

export default function useMessages(chatId: string | null) {
  // const { data: message, error, isLoading } = useSWR();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stopLoading, setStopLoading] = useState(false);

  const lastMessageRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Track how many messages we've loaded for pagination
  const [offset, setOffset] = useState(20);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `/api/chat/${chatId}?offset=0&limit=${PAGE_SIZE}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const initialMessages: Message[] = await response.json();
      setMessages(initialMessages.reverse());
    } catch (error) {
      setError("Failed to load initial messages");
      return;
    } finally {
      setLoading(false);
    }
  };

  // Load previous messages (pagination)
  const loadPreviousMessages = async () => {
    if (!chatId) return;
    try {
      const response = await fetch(
        `/api/chat/${chatId}?offset=${offset}&limit=${PAGE_SIZE}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const prevMessages: Message[] = await response.json();

      if (prevMessages.length > 0 && !stopLoading) {
        // Check if the bunch of messages is smaller than the page size
        // If it is, we stop loading more messages
        // and set the stopLoading state to true
        if (prevMessages.length < PAGE_SIZE) {
          setStopLoading(true);
        }

        // Append the new messages to the existing ones
        setMessages((prev) => [...prevMessages, ...prev]);
        setOffset(offset + prevMessages.length);
      }
    } catch (error) {
      setError("Failed to load previous messages");
      return;
    } finally {
      setLoading(false);
    }
  };

  // Scroll to the bottom of the messages container
  // after a new message is added
  const scrollToBottom = () => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, 100);
  };

  // fetch initial messages
  useEffect(() => {
    if (!chatId) return;
    fetchMessages();
  }, [chatId]);

  // Listen for new messages via SSE
  useEffect(() => {
    if (!chatId) return;
    const eventSource = new EventSource(`/api/chat/${chatId}/stream`);
    eventSource.onmessage = (event) => {
      const newMessages: Message[] = JSON.parse(event.data);
      // Only add new messages that aren't already in the list
      setMessages((prev) => {
        if (!newMessages.length) return prev;

        const lastPrev = prev[prev.length - 1];
        const lastNew = newMessages[newMessages.length - 1];
        if (!lastPrev || lastPrev.createdAt !== lastNew.createdAt) {
          // Creating a microtask in order to scroll to the bottom
          // after the state has been updated
          scrollToBottom();

          // Only append truly new messages
          return [
            ...prev,
            ...newMessages.filter(
              (m) => !prev.some((pm) => pm.createdAt === m.createdAt)
            ),
          ];
        }
        return prev;
      });
    };
    return () => eventSource.close();
  }, [chatId]);

  // Infinite scroll: load older messages when scrolled to top
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      if (container.scrollTop === 0) {
        loadPreviousMessages();
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [chatId, offset]);

  return {
    error,
    loading,
    messages,
    lastMessageRef,
    messagesContainerRef,
    scrollToBottom,
  };
}
