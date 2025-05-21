import { Message } from "@/lib/api/member/chat/chat.types";
import { client } from "@/lib/fetchClient";
import getOrCreateChat from "@/lib/helpers/chat/getOrCreateChat";
import { useEffect, useRef, useState } from "react";

export default function useChat({
  userId,
  memberId,
}: {
  userId: string;
  memberId: string;
}) {
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [stopLoading, setStopLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Track how many messages we've loaded for pagination
  const [offset, setOffset] = useState(20);
  const PAGE_SIZE = 20;

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

  // fetch user profile and chatId
  useEffect(() => {
    if (!userId || !memberId) return;

    getOrCreateChat(userId, memberId).then(setChatId);
  }, [userId, memberId]);

  //   fetch initial messages
  useEffect(() => {
    if (!chatId) return;
    const fetchInitialMessages = async () => {
      const initialMessages = await client(
        `/api/chat/${chatId}?offset=0&limit=${PAGE_SIZE}`,
        { method: "GET" }
      );
      setMessages(initialMessages.reverse());
    };
    fetchInitialMessages();
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

  // Load previous messages (pagination)
  const loadPreviousMessages = async () => {
    if (!chatId) return;
    const prevMessages = await client(
      `/api/chat/${chatId}?offset=${offset}&limit=${PAGE_SIZE}`,
      { method: "GET" }
    );
    console.log("Previous messages:", prevMessages);

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
  };

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

  // Send message
  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim() || !userId || !chatId) return;
    await fetch(`/api/chat/${chatId}/send`, {
      method: "POST",
      body: JSON.stringify({ userId, text }),
      headers: { "Content-Type": "application/json" },
    });
    setText("");
    inputRef.current?.focus();
    scrollToBottom();
  };

  return {
    messages,
    sendMessage: handleSend,
    text,
    setText,
    inputRef,
    lastMessageRef,
    messagesContainerRef,
  };
}
