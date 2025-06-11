// A hook, especially for the chat wrapper component, to handle the chat state and actions.

import { useCallback, useMemo } from "react";

export default function useChatWrapper(chatId: string | undefined) {
  const loadMessages = useCallback(
    async (chatId: string) => {
      const response = await fetch(`/api/chat/${chatId}/messages`);
      if (!response.ok) {
        return [];
      }
      return await response.json();
    },
    [chatId]
  );

  const loadMessagesPromise = useMemo(() => {
    if (!chatId) {
      return Promise.resolve([]); // Return an empty array if no chatId is provided
    }

    return loadMessages(chatId);
  }, [chatId, loadMessages]);

  return {
    loadMessagesPromise,
  };
}
