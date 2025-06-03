"use client";

import { SimpleMessage } from "@/lib/data/chat/chat.types";
import useChatScroll from "@/lib/hooks/chat/useChatScroll";
import useRealtimeChat from "@/lib/hooks/chat/useRealtimeChat";
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface ChatRealtimeProps {
  roomName: string;
  userId: string;
  onMessage: (messages: SimpleMessage[]) => void;
  messages?: SimpleMessage[];
}

export default function ChatRealtime({
  roomName,
  userId,
  onMessage,
  messages: initialMessages = [],
}: ChatRealtimeProps) {
  const { chatContainerRef, scrollToBottom } = useChatScroll();
  const {
    messages: realtimeMessages,
    sendMessage,
    isConnected,
  } = useRealtimeChat({
    roomName,
    userId,
  });

  const [newMessage, setNewMessage] = useState<string>("");

  const allMessages = useMemo(() => {
    const mergedMessages = [...initialMessages, ...realtimeMessages];

    const uniqueMessages = mergedMessages.filter(
      (message, index, self) =>
        index === self.findIndex((m) => m.userId === message.userId)
    );

    const sortedMessages = uniqueMessages.sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt)
    );

    return sortedMessages;
  }, [initialMessages, realtimeMessages]);

  useEffect(() => {
    if (onMessage) {
      onMessage(allMessages);
    }
  }, [allMessages, onMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages, scrollToBottom]);

  const sendMessageHandler = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!newMessage.trim() || !isConnected) return;

      sendMessage(newMessage.trim());
      setNewMessage("");
    },
    [newMessage, isConnected, sendMessage]
  );

  return <div className="">Chat with userB: {userId}</div>;
}
