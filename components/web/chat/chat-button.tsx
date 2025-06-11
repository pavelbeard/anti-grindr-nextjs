"use client";

import { Button } from "@/components/ui/button";
import { useChatModalStore } from "@/lib/store/useChatModalStore";

interface ChatButtonProps {
  withUserId: string; // The ID of the user to chat with
}

export default function ChatButton({ withUserId }: ChatButtonProps) {
  const { openChat } = useChatModalStore();

  const handleOpenChat = () => {
    fetch(`/api/chat/between?withUserId=${withUserId}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        const chatId = data.id;

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
