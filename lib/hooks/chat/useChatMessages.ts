import { Message } from "@/lib/data/chat/chat.types";
import { useEffect, useMemo } from "react";

interface IUseChatMessages {
  initialMessages: Message[];
  realtimeMessages: Message[];
  onMessage?: (messages: Message[]) => void;
  scrollToBottom: () => void;
}

export default function useChatMessages({
  initialMessages,
  realtimeMessages,
  onMessage,
  scrollToBottom,
}: IUseChatMessages) {
  // Combine initial messages with realtime messages, ensuring uniqueness and sorting
  const allMessages = useMemo(() => {
    return [...initialMessages, ...realtimeMessages];
  }, [initialMessages, realtimeMessages]);

  // Fetch member info for the user we are chatting with

  useEffect(() => {
    if (onMessage) {
      onMessage(allMessages);
    }
  }, [allMessages, onMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages, scrollToBottom]);

  return {
    allMessages,
  };
}
