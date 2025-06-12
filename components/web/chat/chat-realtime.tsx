"use client";

import { Message } from "@/lib/data/chat/chat.types";
import useChatScroll from "@/lib/hooks/chat/useChatScroll";
import { cn } from "@/lib/utils";
import ChatHeader from "./chat-header";
import ChatMessages from "./chat-messages";
import ChatFooter from "./chat-footer";
import { ChatContainerContext } from "@/lib/providers/chat-container-context";
import useChatMessages from "@/lib/hooks/message/useChatMessages";
import useBroadcast from "@/lib/hooks/chat/useBroadcast";
import { EVENT_MESSAGE_TYPE } from "@/lib/constants";
import useUserInfo from "@/lib/hooks/chat/useUserInfo";
import { use } from "react";

interface ChatRealtimeProps {
  roomName: string;
  withUserId: string;
  isCollapsed: boolean;
  loadMessagesPromise: Promise<Message[]>; // Promise to load initial messages
}

export default function ChatRealtime({
  roomName,
  withUserId,
  isCollapsed,
  loadMessagesPromise,
}: ChatRealtimeProps) {
  const { messagesContainerRef, scrollToBottom } = useChatScroll();
  const initialMessages = use(loadMessagesPromise);

  const {
    allMessages,
    onMessage,
    setFeed,
    IsBtnScrollToBottomVisible,
    disableScrollToBottom,
    newMessagesCount,
  } = useChatMessages({
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

  const EXPANDED_STYLE = "w-96 h-[500px] bg-zinc-700";
  const COLLAPSED_STYLE = "bg-zinc-400 w-48 h-32";

  return (
    <ChatContainerContext.Provider
      value={{
        chatId: roomName,
        withUserId,
        name: userInfo?.name,
        age: userInfo?.age,
        isCollapsed,
        isConnected,
        sendMessage,
        allMessages,
        messagesContainerRef,
        IsBtnScrollToBottomVisible,
        disableScrollToBottom,
        newMessagesCount,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Chat window"
        data-chatid={roomName}
        data-withuserid={withUserId}
        className={cn(
          "rounded-t-lg shadow-lg flex flex-col transition-all duration-200",
          isCollapsed ? COLLAPSED_STYLE : EXPANDED_STYLE
        )}
      >
        <ChatHeader />
        <ChatMessages />
        <ChatFooter />
      </div>
    </ChatContainerContext.Provider>
  );
}
