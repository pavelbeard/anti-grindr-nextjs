"use client";

import { Button } from "@/components/ui/button";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { useChatContext } from "@/lib/providers/chat-provider";

export default function ChatButton({ userB }: { userB: string }) {
  // const { openChat } = useChatContext();
  const [openChats, setOpenChats] = useLocalStorage<string[]>("openChats", []);

  // Until 10 open chats, then remove the oldest one
  const handleOpenChat = () => {
    if (openChats.length >= 10) {
      setOpenChats((prev) => prev.slice(1));
    }
    setOpenChats((prev) => [...prev, userB]);
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
