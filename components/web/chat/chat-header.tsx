import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import React from "react";
import { useChatContainerContext } from "@/lib/providers/chat-container-context";
import { useChatModalStore } from "@/lib/store/useChatModalStore";

export default function ChatHeader() {
  const { chatId, name, age, expanded } = useChatContainerContext();
  const { closeChat, toggleCollapse } = useChatModalStore();

  return (
    <header
      className={cn(
        "flex items-center justify-between p-4 rounded-t-lg transition-all duration-200",
        expanded ? "bg-green-500" : "bg-none"
      )}
    >
      <h2
        className={cn("transition-all", expanded ? "opacity-100" : "opacity-0")}
      >
        {name}
      </h2>
      <span>{age}</span>
      <div className="flex items-center gap-0.25">
        <button
          className="hover:bg-zinc-500/25 rounded-full transition duration-200"
          onClick={() => closeChat(chatId)}
        >
          <XMarkIcon className={cn("size-8", !expanded && "text-white")} />
        </button>
        <button
          className="hover:bg-zinc-500/25 rounded-full transition duration-200"
          onClick={() => toggleCollapse(chatId)}
        >
          {expanded ? (
            <ChevronDownIcon className="size-8" />
          ) : (
            <ChevronUpIcon className="size-8 text-white" />
          )}
        </button>
      </div>
    </header>
  );
}
