import { Message } from "@/lib/data/chat/chat.types";
import React from "react";

interface ChatMessageProps {
  allMessages: Message[];
}

export default function ChatMessages({ allMessages }: ChatMessageProps) {
  return (
    <ul className="flex-1 overflow-y-auto p-4">
      {allMessages.map((message, index) => (
        <li key={index}>
          <strong>{message.userId}</strong>: {message.text}
        </li>
      ))}
    </ul>
  );
}
