"use client";

import { useChatContext } from "@/lib/providers/chat-provider";
import { OpenChat } from "@/lib/helpers/chatProviderHelpers";
import ChatRealtime from "./chat-realtime";
import { useEffect, useState } from "react";

interface ChatWrapperProps {
  chat: OpenChat;
}

export const ChatWrapper = ({ chat }: ChatWrapperProps) => {
  const { loadMessages } = useChatContext();
  const [messages, setMessages] = useState<
    Awaited<ReturnType<typeof loadMessages>>
  >([]);

  useEffect(() => {
    if (chat.chatId) {
      // Load messages for the chat when chatId is available
      loadMessages(chat.chatId)
        .then((loadedMessages) => {
          setMessages(loadedMessages);
        })
        .catch((error) => {
          console.error("Failed to load messages:", error);
        });
    }
  }, [chat.chatId]);

  // Wait for chatId to be available
  if (!chat.chatId) {
    return (
      <div className="w-64 h-[500px] bg-zinc-700 rounded-t-lg shadow-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
          <p className="text-sm text-white">Connecting to chat...</p>
        </div>
      </div>
    );
  }

  return (
    <ChatRealtime
      roomName={chat.chatId as string}
      withUserId={chat.userIdReceiver}
      expanded={chat.expanded}
      messages={messages}
    />
  );
};

export default function ChatModalContainer() {
  const { openChats } = useChatContext();

  return (
    <div className="fixed bottom-0 right-0 h-16 min-w-2.5 bg-amber-400 mx-4">
      <div className="flex items-end justify-center h-full gap-x-4">
        {openChats.map((chat) => (
          <ChatWrapper key={chat.userIdReceiver} chat={chat} />
        ))}
      </div>
    </div>
  );
}
