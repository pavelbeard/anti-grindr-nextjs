import {
  SendMessageSchema,
  SendMessageType,
} from "@/lib/data/message/message.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IUseChatForm {
  isConnected: (roomName: string) => boolean;
  sendMessage: (
    roomName: string,
    userId: string,
    text: string
  ) => Promise<void>;
}

export default function useChatForm({
  isConnected,
  sendMessage,
}: IUseChatForm) {
  const [isDisabled, setIsDisabled] = useState(true);

  const form = useForm({
    resolver: zodResolver(SendMessageSchema),
    defaultValues: {
      roomName: "",
      toUserId: "",
      text: "",
    },
  });

  // Text input tracker for turning off/on the send button
  useEffect(() => {
    setIsDisabled(!form.watch("text").trim());
  }, [form.watch("text")]);

  const sendMessageHandler = useCallback(
    (data: SendMessageType) => {
      if (!data.roomName || !data.text.trim() || !isConnected(data.roomName))
        return;

      sendMessage(data.roomName, data.toUserId, data.text.trim());
      form.setValue("text", ""); // Clear the text input after sending
    },
    [form, isConnected, sendMessage]
  );

  return {
    form,
    isDisabled,
    sendMessageHandler,
  };
}
