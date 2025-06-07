"use client";

import { Button } from "@/components/ui/button";
import { useChatContext } from "@/lib/providers/chat-provider";

interface ChatButtonProps {
  withUserId: string; // The ID of the user to chat with
}

export default function ChatButton({ withUserId }: ChatButtonProps) {
  const { handleOpenChat } = useChatContext();

  return (
    <Button
      className="action bg-green-600 hover:bg-green-500"
      onClick={() => handleOpenChat(withUserId)}
    >
      Send Message
    </Button>
  );
}
