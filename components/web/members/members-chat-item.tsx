"use client";

import { ChatItemProps } from "@/types/chat.types";
import { cn } from "@/lib/utils";
import WithoutPhoto from "@/public//without-photo.png";
import { useChatModalStore } from "@/lib/store/useChatModalStore";

export default function ChatItem({ chat }: ChatItemProps) {
  const { openChat } = useChatModalStore();

  return (
    <div
      onClick={() =>
        openChat({
          chatId: chat.chatId,
          userIdReceiver: chat.fromUserId as string,
        })
      }
      role="listitem"
      className="text-gray-300 flex items-center gap-2 p-4 bg-green-500/20 rounded-lg w-full hover:cursor-pointer hover:bg-green-500/30 transition-colors duration-200 ease-in-out"
      data-chatid={chat.chatId}
    >
      <div aria-label="Chat member photo and status" className="relative">
        <img
          src={chat.fromAvatar ?? WithoutPhoto.src}
          alt="member photo"
          className="size-12 rounded-full"
        />
        <span
          className={cn(
            "absolute bottom-0.25 right-0.25 size-4 rounded-full",
            chat.isUserOnline ? "bg-green-500" : "bg-gray-500"
          )}
        ></span>
      </div>

      <div
        aria-label="Chat message and nickname"
        className="flex-1 flex flex-col"
      >
        <p className="text-lg font-semibold text-white">
          {chat.fromName ?? "*"}
        </p>
        <p className="text-sm">{chat.message?.text}</p>
      </div>
    </div>
  );
}
