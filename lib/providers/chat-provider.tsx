"use client";

import { createContext, use, useEffect, useRef, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useSWRLazy from "../hooks/useSWRLazy";
import { fetcher } from "../fetchClient";
import { User } from "@/app/generated/prisma";

type ChatContextType = {
  isChatModalOpen: boolean;
  isChatModalMinimized: boolean;
  chatId: string | null;
  userB: User | null;
  error: any;
  isLoading: boolean;
  openChat: ({ userA, userB }: { userA: string; userB: string }) => void; // userA id and userB id
  closeChat: () => void;
  minimizeChat: () => void;
  maximizeChat: () => void;
};

const ChatContext = createContext<ChatContextType | null>(null);

const createPrivateChat = async ({
  userA,
  userB,
}: {
  userA: string;
  userB: string;
}) => {
  const response = await fetch(
    `/api/chat/between?userA=${userA}&userB=${userB}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create chat");
  }

  return response.json();
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isChatModalOpen, setIsChatModalOpen] = useLocalStorage(
    "isChatModalOpen",
    false
  );
  const [isChatModalMinimized, setIsChatModalMinimized] = useLocalStorage(
    "isChatModalMinimized",
    false
  );
  const [userPair, setUserPair] = useLocalStorage("currentChat", {
    userA: "",
    userB: "",
  });

  const {
    data: lazyData,
    error,
    isLoading,
    triggerFetchWithKey,
  } = useSWRLazy(null, fetcher);

  const {
    data: userB,
    triggerFetchWithKey: triggerFetchUserBWithKey,
  } = useSWRLazy(null, fetcher);

  const openChat = ({ userA, userB }: { userA: string; userB: string }) => {
    setUserPair({ userA, userB });
    triggerFetchWithKey(`/api/chat/between?userA=${userA}&userB=${userB}`);
    triggerFetchUserBWithKey(`/api/user/${userB}`);
    setIsChatModalOpen(true);
  };
  const closeChat = () => setIsChatModalOpen(false);

  const minimizeChat = () => setIsChatModalMinimized(true);
  const maximizeChat = () => setIsChatModalMinimized(false);

  // currently opened chatId

  // if chat not found, create a new one
  useEffect(() => {
    if (lazyData?.error === "Not found") {
      createPrivateChat({
        userA: userPair?.userA as string,
        userB: userPair?.userB as string,
      }).then((data) => {
        if (data?.chatId) {
          triggerFetchWithKey(
            `/api/chat/between?userA=${userPair?.userA}&userB=${userPair?.userB}`
          );
        }
      });
    }
  }, [lazyData]);

  // Fetch chat messages when chat modal is opened
  useEffect(() => {
    if (isChatModalOpen) {
      // Fetch chat messages when chat modal is opened
      triggerFetchWithKey(
        `/api/chat/between?userA=${userPair?.userA}&userB=${userPair?.userB}`
      );
    }
  }, [isChatModalOpen]);

  return (
    <ChatContext.Provider
      value={{
        isChatModalOpen,
        isChatModalMinimized,
        chatId: lazyData?.chatId as string,
        userB,
        error,
        isLoading,
        openChat,
        closeChat,
        minimizeChat,
        maximizeChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => {
  const context = use(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
