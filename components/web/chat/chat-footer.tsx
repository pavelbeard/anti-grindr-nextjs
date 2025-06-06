import { cn } from "@/lib/utils";;
import React from "react";
import ChatForm from "./chat-form";

interface ChatFooterProps {
  expanded: boolean;
}

export default function ChatFooter({ expanded }: ChatFooterProps) {
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
