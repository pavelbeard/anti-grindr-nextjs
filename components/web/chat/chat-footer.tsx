import { cn } from "@/lib/utils";
import React from "react";
import ChatForm from "./chat-form";
import { useChatContainerContext } from "@/lib/providers/chat-container-context";

export default function ChatFooter() {
  const { expanded } = useChatContainerContext();
  return (
    <footer
      className={cn(
        "transition-all duration-200",
        expanded ? "flex items-center bg-green-500 p-4" : "hidden"
      )}
    >
      <ChatForm />
    </footer>
  );
}
