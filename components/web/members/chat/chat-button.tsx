"use client";

import { Button } from "@/components/ui/button";
import { useChatContext } from "@/lib/providers/chat/chat-provider";

export default function ChatButton({ userB }: { userB: string }) {
  const { openChat } = useChatContext();

  return (
    <Button
      className="action bg-green-600 hover:bg-green-500"
      onClick={() => openChat(userB)}
    >
      Send Message
    </Button>
  );
}
