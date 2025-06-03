import { useState } from "react";

interface ChatResponse {
  chatId: string;
}

export const useChatOperations = () => {
  const [isCreating, setIsCreating] = useState(false);

  const getOrCreateChat = async (userB: string): Promise<string> => {
    if (!userB) throw new Error("UserB is required to get or create a chat");

    setIsCreating(true);
    try {
      // 1. Try to get the existing chat with userB
      const privateChatResponse = await fetch(
        `/api/chat/between?userB=${userB}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (privateChatResponse.ok) {
        const { chatId } = (await privateChatResponse.json()) as ChatResponse;
        return chatId;
      }

      // 2. If chat doesn't exist, create a new one
      const newChatResponse = await fetch(`/api/chat/between?userB=${userB}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!newChatResponse.ok) {
        throw new Error("Failed to create chat");
      }

      const { chatId } = (await newChatResponse.json()) as ChatResponse;
      return chatId;
    } catch (error) {
      console.error("Failed to get or create chat:", error);
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    getOrCreateChat,
    isCreating,
  };
};
