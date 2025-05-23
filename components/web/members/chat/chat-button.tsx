"use client";

import { Button } from "@/components/ui/button";
import { useChatContext } from "@/lib/providers/chat-provider";

export default function ChatButton({
  userA,
  userB,
}: {
  userA: string;
  userB: string;
}) {
  const { openChat } = useChatContext();

  return (
    <Button
      className="action bg-green-600 hover:bg-green-500"
      onClick={() => openChat({ userA, userB })}
    >
      Send Message
    </Button>
  );
}
