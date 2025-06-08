"use client";

import { Message } from "@/lib/data/chat/chat.types";
import useChatScroll from "@/lib/hooks/chat/useChatScroll";
import { cn } from "@/lib/utils";
import React, { useCallback } from "react";
import ChatHeader from "./chat-header";
import ChatMessages from "./chat-messages";
import ChatFooter from "./chat-footer";
import { ChatContainerContext } from "@/lib/providers/chat-container-context";
import useChatMessages from "@/lib/hooks/chat/useChatMessages";
import useBroadcast from "@/lib/hooks/chat/useBroadcast";
import { EVENT_MESSAGE_TYPE } from "@/lib/constants";
import useUserInfo from "@/lib/hooks/chat/useUserInfo";
import { supabase } from "@/lib/supabase/client";

interface ChatRealtimeProps {
  roomName: string;
  withUserId: string;
  messages?: Message[];
  expanded: boolean;
}

export default function ChatRealtime({
  roomName,
  withUserId,
  messages: initialMessages = [],
  expanded,
}: ChatRealtimeProps) {
  const { chatContainerRef, scrollToBottom } = useChatScroll();

  const { allMessages, onMessage, setFeed } = useChatMessages({
    initialMessages,
    scrollToBottom,
  });

  const { isConnected, sendMessage } = useBroadcast({
    toUserId: withUserId,
    roomName,
    event: EVENT_MESSAGE_TYPE,
    onMessage,
    setFeed,
  });

  const { userInfo } = useUserInfo(withUserId);

  const EXPANDED_STYLE = "w-96 h-96 bg-zinc-700";
  const COLLAPSED_STYLE = "bg-zinc-400 w-48 h-32";

  return (
    <ChatContainerContext.Provider
      value={{
        withUserId,
        name: userInfo?.name,
        age: userInfo?.age,
        expanded,
        isConnected,
        sendMessage,
        allMessages
      }}
    >
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
        <ChatHeader />
        <ChatMessages />
        <ChatFooter />
      </div>
    </ChatContainerContext.Provider>
  );
}
