import { Message, SimpleMessage } from "../data/chat/chat.types";

interface ICombineMessages {
  initialMessages: Message[];
  realtimeMessages: SimpleMessage[];
}

export const combineMessages = ({
  initialMessages,
  realtimeMessages,
}: ICombineMessages): SimpleMessage[] => {
  // Combine initial messages with realtime messages, ensuring uniqueness and sorting
  const combinedMessages = [...initialMessages, ...realtimeMessages].map(
    (msg) => ({
      id: msg.id,
      userId: msg.userId,
      text: msg.text,
      createdAt: msg.createdAt,
    })
  );

  // Sort messages by createdAt in ascending order
  combinedMessages.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return combinedMessages;
};
