import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface ChatContextType {}

type OpenChat = {
  withUserId: string;
  expanded: boolean;
};

const ChatContext = createContext<ChatContextType | null>(null);

// Chat state logic manager
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [openChats, setOpenChats] = useLocalStorage<OpenChat[]>(
    "openChats",
    []
  );

  // Until 10 open chats and 2 active chats, then remove the oldest one
  const handleOpenChat = (userB: string) => {
    if (openChats.length >= 10) {
      setOpenChats((prev) => prev.slice(1));
    }

    if (openChats.filter((chat) => chat.expanded).length >= 2) {
      setOpenChats((prev) => prev.filter((chat) => !chat.expanded));
    }

    setOpenChats((prev) => [...prev, { withUserId: userB, expanded: true }]);
  };
  // Placeholder for the provider logic
  return <ChatContext.Provider value={{}}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
