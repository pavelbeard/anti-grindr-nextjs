import { Message, SimpleMessage } from "../data/chat/chat.types";

export const combineMessages = (
  initialMessages: Message[],
  realtimeMessages: SimpleMessage[]
): SimpleMessage[] => {
  // Combine initial messages with realtime messages, ensuring uniqueness and sorting
  const combinedMessages = [...initialMessages, ...realtimeMessages].map(
    (msg) => ({
      id: msg.id,
      userId: msg.userId,
      text: msg.text,
      createdAt: msg.createdAt,
    })
  );

  // Remove duplicates based on userId and text
  const uniqueMessages = Array.from(
    new Map(
      combinedMessages.map((msg) => [`${msg.userId}-${msg.text}`, msg])
    ).values()
  );

  // Sort messages by createdAt in ascending order
  uniqueMessages.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return uniqueMessages;
};
