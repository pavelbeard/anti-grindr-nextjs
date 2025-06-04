"use client";

import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { openNewChat, OpenChat } from "../helpers/chat-provider-helpers";

interface ChatContextType {
  openChats: OpenChat[];
  handleOpenChat: (userB: string) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

// Chat state logic manager
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [openChats, setOpenChats] = useLocalStorage<OpenChat[]>(
    "openChats",
    []
  );

  const handleOpenChat = (withNewUserId: string) => {
    const updatedChats = openNewChat(openChats, withNewUserId);
    setOpenChats(updatedChats);
  };

  // Placeholder for the provider logic
  return (
    <ChatContext.Provider
      value={{
        openChats,
        handleOpenChat,
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
