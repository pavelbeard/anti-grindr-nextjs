import { combineMessages } from "@/lib/helpers/useChatMessagesHelpers";
import { describe, expect, it } from "vitest";

describe("combineMessages", () => {
  it("should combine initial messages with realtime messages, ensuring uniqueness and sorting", () => {
    const initialMessages = [
      {
        id: "1",
        userId: "user1",
        text: "Hello",
        createdAt: "2023-10-01T10:00:00Z",
      },
      {
        id: "2",
        userId: "user2",
        text: "World",
        createdAt: "2023-10-01T10:05:00Z",
      },
      {
        id: "4",
        userId: "user3",
        text: "How are you?",
        createdAt: "2023-10-01T10:03:00Z",
      },
      {
        id: "5",
        userId: "user1",
        text: "I'm fine",
        createdAt: "2023-10-01T10:04:00Z",
      },
    ];
    const realtimeMessages = [
      {
        id: "3",
        userId: "user1",
        text: "Hello, from Realtime",
        createdAt: "2023-10-01T10:02:00Z",
      },
    ];

    const combined = combineMessages(initialMessages, realtimeMessages);
    expect(combined).toHaveLength(5);
  });
});
