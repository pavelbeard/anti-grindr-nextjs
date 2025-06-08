"use client";

import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  openNewChat,
  OpenChat,
  closeChat,
  toggleChatExpansion,
  assignChatIdToOpenChat,
} from "../helpers/chatProviderHelpers";
import { Message } from "../data/chat/chat.types";
import { useUser } from "@clerk/nextjs";

interface ChatContextType {
  openChats: OpenChat[];
  handleOpenChat: (withNewUserId: string) => void;
  handleCloseChat: (withUserId: string) => void;
  handleToggleChatExpansion: (withUserId: string) => void;
  loadMessages: (chatId: string) => Promise<Message[]>;
}

export const ChatContext = createContext<ChatContextType | null>(null);

// Chat state logic manager
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, user } = useUser();
  const [openChats, setOpenChats] = useLocalStorage<OpenChat[]>(
    "openChats",
    []
  );

  const handleOpenChat = async (withNewUserId: string) => {
    if (isLoaded && user) {
      // Phase 1: Open chat immediately for fast UI response
      const openedChats = await openNewChat({
        currentChats: openChats,
        userIdSender: user.id,
        withNewUserId,
      });
      setOpenChats(openedChats);

      // Phase 2: Assign chatId and members asynchronously in background
      assignChatIdToOpenChat({
        currentChats: openedChats,
        userIdReceiver: withNewUserId,
      })
        .then((updatedChats) => {
          setOpenChats(updatedChats);
        })
        .catch((error) => {
          console.error("Failed to assign chat ID:", error);
          // Chat remains functional without chatId
        });
    }
  };

  const handleCloseChat = async (withUserId: string) => {
    const updatedChats = await closeChat(openChats, withUserId);
    setOpenChats(updatedChats);
  };

  const handleToggleChatExpansion = async (withUserId: string) => {
    const updatedChats = await toggleChatExpansion(openChats, withUserId);
    setOpenChats(updatedChats);
  };

  const loadMessages = async (chatId: string): Promise<Message[]> => {
    const response = await fetch(`/api/chat/${chatId}/messages`);
    if (!response.ok) {
      return [];
    }
    return await response.json();
  };

  // Placeholder for the provider logic
  return (
    <ChatContext.Provider
      value={{
        openChats,
        handleOpenChat,
        handleCloseChat,
        handleToggleChatExpansion,
        loadMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
