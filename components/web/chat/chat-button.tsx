"use client";

import { Button } from "@/components/ui/button";
import { useChatModalStore } from "@/lib/store/useChatModalStore";

interface ChatButtonProps {
  withUserId: string; // The ID of the user to chat with
}

async function getOrCreateChat(withUserId: string) {
  const getChatResponse = await fetch(
    `/api/chat/with-user?userId=${withUserId}`
  );

  if (!getChatResponse.ok) {
    const createChatResponse = await fetch(`/api/chat/with-user`, {
      method: "POST",
      body: JSON.stringify({ withUserId }),
    });

    if (!createChatResponse.ok) {
      throw new Error("Failed to create chat");
    }

    const createdChat = (await createChatResponse.json()) as {
      id: string;
      createdAt: Date;
    };

    return createdChat;
  }

  const chat = (await getChatResponse.json()) as {
    id: string;
    createdAt: Date;
  };
  return chat;
}

export default function ChatButton({ withUserId }: ChatButtonProps) {
  const { openChat } = useChatModalStore();

  const handleOpenChat = () => {
    getOrCreateChat(withUserId).then((data) => {
      const chatId = data?.id;

      if (!chatId) {
        throw new Error("Failed to get chat ID");
      }

      openChat({ chatId, userIdReceiver: withUserId });
    });
  };

  return (
    <Button
      className="action bg-green-600 hover:bg-green-500"
      onClick={handleOpenChat}
    >
      Send Message
    </Button>
  );
}
