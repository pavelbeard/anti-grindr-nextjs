import { useChatContainerContext } from "@/lib/providers/chat-container-context";
import React from "react";


export default function ChatMessages() {
  const { allMessages} = useChatContainerContext();
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
