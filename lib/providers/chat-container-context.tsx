import { SendMessageParams } from "@/types/chat.types";
import { createContext, useContext } from "react";

interface IChatContainerContext {
  withUserId: string;
  name?: string | null;
  age?: number | null;
  expanded: boolean;
  isConnected: boolean;
  sendMessage: ({ text }: SendMessageParams) => Promise<void>;
}

export const ChatContainerContext = createContext<IChatContainerContext | null>(
  null
);

export function useChatContainerContext() {
  const context = useContext(ChatContainerContext);
  if (!context) {
    throw new Error(
      "useChatContainerContext must be used within a ChatContainerProvider"
    );
  }
  return context;
}
