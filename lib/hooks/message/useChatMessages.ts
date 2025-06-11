import { Message, SimpleMessage } from "@/lib/data/chat/chat.types";
import { combineMessages } from "@/lib/helpers/useChatMessagesHelpers";
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

  // TEST
  // Combine initial messages with realtime messages, ensuring uniqueness and sorting
  const allMessages = useMemo(() => {
    // combine initial messages with realtime messages
    const result = combineMessages(initialMessages, realtimeMessages);
    console.log("allMessages", result);

    return result;
  }, [initialMessages, realtimeMessages]);

  // BUG: user loses messages when it writes a new message
  // for incoming messages, update the realtimeMessages state, adds to the newMessagesCount and sets up the scroll to bottom button
  const onMessage = useCallback(
    ({
      payload: { id, userId, text, createdAt },
    }: {
      payload: SimpleMessage;
    }) => {
      // Enable scroll to bottom button if there is one or more realtime messages
      setIsBtnScrollToBottomVisible(true);
      setRealtimeMessages((prevMessages) => [
        ...prevMessages,
        { id, userId, text, createdAt },
      ]);
      setNewMessagesCount((prev) => prev + 1);
    },
    []
  );

  // for upcoming messages, set the feed with the new messages
  const setFeed = useCallback((messages: SimpleMessage[]) => {
    setRealtimeMessages((prevMessages) => [...prevMessages, ...messages]);
    scrollToBottom();
  }, []);

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
