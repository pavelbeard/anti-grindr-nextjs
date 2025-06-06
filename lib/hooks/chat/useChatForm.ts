import {
  SendMessageSchema,
  SendMessageType,
} from "@/lib/data/message/message.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IUseChatForm {
  isConnected: boolean;
  sendMessage: (text: string) => void;
}

export default function useChatForm({
  isConnected,
  sendMessage,
}: IUseChatForm) {
  const [isDisabled, setIsDisabled] = useState(true);

  const form = useForm({
    resolver: zodResolver(SendMessageSchema),
    defaultValues: {
      text: "",
    },
  });

  // Text input tracker for turning off/on the send button
  useEffect(() => {
    setIsDisabled(!form.watch("text").trim());
  }, [form.watch("text")]);

  const sendMessageHandler = useCallback(
    (data: SendMessageType) => {
      if (!data.text.trim() || !isConnected) return;

      sendMessage(data.text.trim());
      form.reset();
    },
    [form, isConnected, sendMessage]
  );

  return {
    form,
    isDisabled,
    sendMessageHandler,
  };
}
