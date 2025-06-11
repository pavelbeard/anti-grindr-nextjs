import { SendMessageParams } from "@/types/chat.types";
import { createContext, useContext } from "react";
import { Message } from "../data/chat/chat.types";

interface IChatContainerContext {
  chatId: string;
  withUserId: string;
  name?: string | null;
  age?: number | null;
  expanded: boolean;
  isConnected: boolean;
  sendMessage: ({ text }: SendMessageParams) => Promise<void>;
  allMessages: Message[],
  messagesContainerRef: React.RefObject<HTMLDivElement | null>;
  IsBtnScrollToBottomVisible: boolean;
  disableScrollToBottom: () => void;
  newMessagesCount: number;
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
