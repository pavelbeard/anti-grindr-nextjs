"use client";

import { Message } from "@/lib/data/chat/chat.types";
import useChatScroll from "@/lib/hooks/chat/useChatScroll";
import useRealtimeChat from "@/lib/hooks/chat/useRealtimeChat";
import { cn } from "@/lib/utils";
import React from "react";
import ChatHeader from "./chat-header";
import ChatMessages from "./chat-messages";
import ChatFooter from "./chat-footer";
import { ChatFormContext } from "@/lib/providers/chat-form-context";
import useChatForm from "@/lib/hooks/chat/useChatForm";
import useChatMessages from "@/lib/hooks/chat/useChatMessages";

interface ChatRealtimeProps {
  roomName: string | undefined;
  withUserId: string;
  onMessage: (messages: Message[]) => void;
  messages?: Message[];
  expanded: boolean;
}

export default function ChatRealtime({
  roomName,
  withUserId,
  onMessage,
  messages: initialMessages = [],
  expanded,
}: ChatRealtimeProps) {
  const { chatContainerRef, scrollToBottom } = useChatScroll();
  
  const {
    messages: realtimeMessages,
    sendMessage,
    isConnected,
  } = useRealtimeChat({
    roomName,
    userId: withUserId,
  });

  const { allMessages, userInfo } = useChatMessages({
    initialMessages,
    realtimeMessages,
    withUserId,
    onMessage,
    scrollToBottom,
  });

  const { form, isDisabled, sendMessageHandler } = useChatForm({
    isConnected,
    sendMessage,
  });

  const EXPANDED_STYLE = "w-96 h-96 bg-zinc-700";
  const COLLAPSED_STYLE = "bg-zinc-400 w-48 h-32";

  return (
    <ChatFormContext.Provider value={{ form, isDisabled, sendMessageHandler }}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Chat window"
        data-chatid={roomName}
        data-withuserid={withUserId}
        ref={chatContainerRef}
        className={cn(
          "rounded-t-lg shadow-lg flex flex-col transition-all duration-200",
          expanded ? EXPANDED_STYLE : COLLAPSED_STYLE
        )}
      >
        <ChatHeader
          expanded={expanded}
          withUserId={withUserId}
          name={userInfo?.name}
          age={userInfo?.age}
        />
        <ChatMessages allMessages={allMessages} />
        <ChatFooter expanded={expanded} />
      </div>
    </ChatFormContext.Provider>
  );
}
