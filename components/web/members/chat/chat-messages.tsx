"use client";

import { Message } from "@/lib/api/member/chat/chat.types";

export default function ChatMessages({
  messages,
  userB,
  isEmpty = false,
}: {
  messages: Message[];
  userB: string | null;
  isEmpty?: boolean;
}) {
  return (
    <div className="flex flex-col justify-center gap-y-4 w-full overflow-y-auto h-full">
      {isEmpty && (
        <p className="text-white">No messages yet. Start the conversation!</p>
      )}
      {messages.map((message, index) => (
        <div
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
