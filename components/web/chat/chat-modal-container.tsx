"use client";

import ChatRealtime from "./chat-realtime";
import { Suspense, memo } from "react";
import useChatWrapper from "@/lib/hooks/chat/useChatWrapper";
import { useChatModalStore } from "@/lib/store/useChatModalStore";

export const ChatRealtimeFallback = ({ loadingText }: { loadingText: string }) => (
  <div className="w-64 h-[500px] bg-zinc-700 rounded-t-lg shadow-lg flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
      <p className="text-sm text-white">{loadingText}</p>
    </div>
  </div>
);

interface ChatWrapperProps {
  chatId: string;
  userIdReceiver: string;
  isCollapsed: boolean;
}

export const ChatWrapper = memo(({ chat }: { chat: ChatWrapperProps }) => {
  const { loadMessagesPromise } = useChatWrapper(chat.chatId);

  return (
    <Suspense
      fallback={<ChatRealtimeFallback loadingText="Loading messages..." />}
    >
      <ChatRealtime
        roomName={chat.chatId}
        withUserId={chat.userIdReceiver}
        expanded={chat.isCollapsed}
        loadMessagesPromise={loadMessagesPromise}
      />
    </Suspense>
  );
});

ChatWrapper.displayName = "ChatWrapper";

export default function ChatModalContainer() {
  const { modals: openChats } = useChatModalStore();

  return (
    <div
      role="chat-modal-container"
      className="fixed bottom-0 right-0 h-16 min-w-2.5 bg-amber-400 mx-4"
    >
      <div className="flex items-end justify-center h-full gap-x-4">
        {openChats.map((chat) => (
          <ChatWrapper key={chat.userIdReceiver} chat={chat} />
        ))}
      </div>
    </div>
  );
}
