"use client";

import { Message } from "@/lib/data/chat/chat.types";
import { useChatContext } from "@/lib/providers/chat-provider";

export default function ChatMessages({
  messages,
  userB,
  isEmpty = false,
}: {
  messages: Message[];
  userB: string | null;
  isEmpty?: boolean;
}) {
  const { lastMessageRef, messagesContainerRef } = useChatContext();

  return (
    <div
      ref={messagesContainerRef}
      className="flex flex-col justify-center gap-y-4 w-full overflow-y-auto h-full py-4"
    >
      {isEmpty && (
        <p className="text-white text-center">No messages yet. Start the conversation!</p>
      )}
      {messages.map((message, index) => (
        <div
          ref={index === messages.length - 1 ? lastMessageRef : null}
          key={index}
          className={`flex gap-x-2 ${
            message.userId === userB ? "justify-start" : "justify-end"
          }`}
        >
          <div
            className={`rounded-lg p-2 text-white ${
              message.userId === userB ? "bg-blue-500" : "bg-green-500"
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
}
