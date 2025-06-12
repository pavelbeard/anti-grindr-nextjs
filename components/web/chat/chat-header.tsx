import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import React from "react";
import { useChatContainerContext } from "@/lib/providers/chat-container-context";
import { useChatModalStore } from "@/lib/store/useChatModalStore";
import WithoutPhoto from "@/public/without-photo.png";
import Link from "next/link";

export default function ChatHeader() {
  const { chatId, name, age, isCollapsed, withUserId } =
    useChatContainerContext();
  const { closeChat, toggleCollapse } = useChatModalStore();

  return (
    <header
      className={cn(
        "flex items-center justify-between gap-x-4 p-4 rounded-t-lg transition-all duration-200",
        isCollapsed ? "bg-none" : "bg-green-500"
      )}
    >
      <div className="flex gap-x-4 items-center w-full">
        <Link href={`/members/${withUserId}`} className="flex-shrink-0">
          <img
            src={WithoutPhoto.src}
            alt="member photo"
            className="size-12 rounded-full ring-zinc-400 ring-1"
          />
        </Link>
        {!isCollapsed && (
          <h2
            className={cn(
              "transition-all flex-1",
              isCollapsed ? "opacity-0" : "opacity-100"
            )}
          >
            {name ?? "*"}
          </h2>
        )}
        <span>{age}</span>
      </div>
      <div className="flex items-center gap-0.25">
        <button
          className="hover:bg-zinc-500/25 rounded-full transition duration-200"
          onClick={() => closeChat(chatId)}
        >
          <XMarkIcon className={cn("size-8", isCollapsed && "text-white")} />
        </button>
        <button
          className="hover:bg-zinc-500/25 rounded-full transition duration-200"
          onClick={() => toggleCollapse(chatId)}
        >
          {isCollapsed ? (
            <ChevronUpIcon className="size-8 text-white" />
          ) : (
            <ChevronDownIcon className="size-8" />
          )}
        </button>
      </div>
    </header>
  );
}
