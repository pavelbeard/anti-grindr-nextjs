import { cn } from "@/lib/utils";
import React from "react";
import ChatForm from "./chat-form";
import { useChatContainerContext } from "@/lib/providers/chat-container-context";

export default function ChatFooter() {
  const { isCollapsed } = useChatContainerContext();
  return (
    <footer
      className={cn(
        "transition-all duration-200",
        isCollapsed ? "hidden" : "flex items-center bg-green-500 p-4"
      )}
    >
      <ChatForm />
    </footer>
  );
}
