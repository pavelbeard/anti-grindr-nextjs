import type { SendMessageType } from "@/lib/api/member/chat/chat.schemas";
import { SendMessageSchema } from "@/lib/api/member/chat/chat.schemas";
import getOrCreateChat from "@/lib/helpers/chat/getOrCreateChat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useMessages from "./useMessages";

export default function useChat({
  userA,
  userB,
}: {
  userA: string;
  userB: string;
}) {
  const [chatId, setChatId] = useState<string | null>(null);

  const {
    error,
    loading,
    messages,
    lastMessageRef,
    messagesContainerRef,
    scrollToBottom,
  } = useMessages(chatId);

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    resolver: zodResolver(SendMessageSchema),
    defaultValues: {
      text: "",
    },
  });

  // fetch user profile and chatId
  useEffect(() => {
    if (!userA || !userB) return;

    getOrCreateChat(userA, userB).then(setChatId);
  }, [userA, userB]);

  // Send message
  const handleSend = async (data: SendMessageType) => {
    await fetch(`/api/chat/${chatId}/send`, {
      method: "POST",
      body: JSON.stringify({ userId: userA, text: data.text }),
      headers: { "Content-Type": "application/json" },
    });

    inputRef.current?.focus();
    scrollToBottom();
    form.reset();
  };

  return {
    error,
    loading,
    messages,
    sendMessage: handleSend,
    form,
    inputRef,
    lastMessageRef,
    messagesContainerRef,
  };
}
