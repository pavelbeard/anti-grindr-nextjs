import { Message, SimpleMessage } from "@/lib/data/chat/chat.types";
import { useCallback, useEffect, useMemo, useState } from "react";

interface IUseChatMessages {
  initialMessages: Message[];
  scrollToBottom: () => void;
}

export default function useChatMessages({
  initialMessages,
  scrollToBottom,
}: IUseChatMessages) {
  const [realtimeMessages, setRealtimeMessages] = useState<SimpleMessage[]>([]);

  // Combine initial messages with realtime messages, ensuring uniqueness and sorting
  const allMessages = useMemo(() => {
    // combine initial messages with realtime messages

    console.log("Realtime Messages:", realtimeMessages);

    const combinedMessages = [...initialMessages, ...realtimeMessages].map(
      (msg) => ({
        userId: msg.userId,
        text: msg.text,
        createdAt: msg.createdAt,
      })
    );

    console.log("Combined Messages:", combinedMessages);

    // Remove duplicates based on userId and text
    const uniqueMessages = Array.from(
      new Map(
        combinedMessages.map((msg) => [`${msg.userId}-${msg.text}`, msg])
      ).values()
    );

    // Sort messages by createdAt in ascending order
    uniqueMessages.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    console.log("Unique Messages:", uniqueMessages);

    return uniqueMessages;
  }, [initialMessages, realtimeMessages]);

  // Fetch member info for the user we are chatting with

  useEffect(() => {
    scrollToBottom();
  }, [allMessages, scrollToBottom]);

  const onMessage = useCallback(
    ({ payload: { userId, text, createdAt } }: { payload: SimpleMessage }) => {
      setRealtimeMessages((prevMessages) => [
        ...prevMessages,
        { userId, text, createdAt },
      ]);
    },
    [realtimeMessages]
  );

  const setFeed = useCallback(
    (messages: SimpleMessage[]) => {
      setRealtimeMessages(messages);
    },
    [setRealtimeMessages]
  );

  return {
    allMessages,
    onMessage,
    setFeed,
  };
}
