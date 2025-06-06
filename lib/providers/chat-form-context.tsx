import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { SendMessageType } from "../data/message/message.schemas";

interface IChatFormContext {
  isDisabled: boolean;
  form: ReturnType<typeof useForm<SendMessageType>>;
  sendMessageHandler: (data: SendMessageType) => void;
}

export const ChatFormContext = createContext<IChatFormContext | null>(null);

export function useChatFormContext() {
  const context = useContext(ChatFormContext);
  if (!context) {
    throw new Error(
      "useChatFormContext must be used within a ChatFormProvider"
    );
  }
  return context;
}
