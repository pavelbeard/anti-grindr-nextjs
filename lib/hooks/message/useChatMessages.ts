import { Message, SimpleMessage } from "@/lib/data/chat/chat.types";
import { useCallback, useMemo, useState } from "react";

interface IUseChatMessages {
  initialMessages: Message[];
  scrollToBottom: () => void;
}

// Generate Message ID by user
// Add pagination support
// Add scroll to bottom by button "new messages" +
export default function useChatMessages({
  initialMessages,
  scrollToBottom,
}: IUseChatMessages) {
  const [realtimeMessages, setRealtimeMessages] = useState<SimpleMessage[]>([]);
  const [IsBtnScrollToBottomVisible, setIsBtnScrollToBottomVisible] =
    useState(false);
  const [newMessagesCount, setNewMessagesCount] = useState(0);

  // Combine initial messages with realtime messages, ensuring uniqueness and sorting
  const allMessages = useMemo(() => {
    // combine initial messages with realtime messages
    const combinedMessages = [...initialMessages, ...realtimeMessages].map(
      (msg) => ({
        userId: msg.userId,
        text: msg.text,
        createdAt: msg.createdAt,
      })
    );

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

    return uniqueMessages;
  }, [initialMessages, realtimeMessages]);

  // for incoming messages, update the realtimeMessages state, adds to the newMessagesCount and sets up the scroll to bottom button
  const onMessage = useCallback(
    ({ payload: { userId, text, createdAt } }: { payload: SimpleMessage }) => {
      // Enable scroll to bottom button if there is one or more realtime messages
      setIsBtnScrollToBottomVisible(true);
      setRealtimeMessages((prevMessages) => [
        ...prevMessages,
        { userId, text, createdAt },
      ]);
      setNewMessagesCount((prev) => prev + 1);
    },
    [realtimeMessages]
  );

  // for upcoming messages, set the feed with the new messages
  const setFeed = useCallback(
    (messages: SimpleMessage[]) => {
      setRealtimeMessages(messages);
      scrollToBottom();
    },
    [setRealtimeMessages]
  );

  const disableScrollToBottom = useCallback(() => {
    scrollToBottom();
    // Disable the scroll to bottom button
    setTimeout(() => {
      setNewMessagesCount(0);
      setIsBtnScrollToBottomVisible(false);
    }, 100);
  }, []);

  return {
    allMessages,
    onMessage,
    setFeed,
    IsBtnScrollToBottomVisible,
    disableScrollToBottom,
    newMessagesCount,
  };
}
