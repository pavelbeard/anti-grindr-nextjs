import type { SendMessageType } from "@/lib/api/member/chat/chat.schemas";
import { SendMessageSchema } from "@/lib/api/member/chat/chat.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import useMessages from "./useMessages";

const createPrivateChat = async (userB: string) => {
  const response = await fetch(`/api/chat/between?userB=${userB}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to create chat");
  }

  return response.json();
};

const getPrivateChat = async (userB: string) => {
  const { data, error, isLoading } = useSWR(
    `/api/chat/between?userB=${userB}`,
    async (url) => {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch chat");
      }

      return response.json();
    }
  );

  return { data, error, isLoading };
};

const getOrCreateChat = async (userB: string) => {
  const chat = await getPrivateChat(userB);

  if (chat.error) {
    const newChat = await createPrivateChat(userB);
    return newChat.id;
  }

  return chat.data.id;
};

export default function useChat(userB: string | null) {
  const [chatId, setChatId] = useState<string | null>(null);

  const {
    error,
    loading: isLoading,
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
    if (!userB) return;

    getOrCreateChat(userB).then(setChatId);
  }, [userB]);

  // Send message
  const handleSend = async (data: SendMessageType) => {
    await fetch(`/api/chat/${chatId}/send`, {
      method: "POST",
      body: JSON.stringify({ text: data.text }),
      headers: { "Content-Type": "application/json" },
    });

    inputRef.current?.focus();
    scrollToBottom();
    form.reset();
  };

  return {
    error,
    isLoading,
    messages,
    sendMessage: handleSend,
    chatId,
    form,
    inputRef,
    lastMessageRef,
    messagesContainerRef,
  };
}
