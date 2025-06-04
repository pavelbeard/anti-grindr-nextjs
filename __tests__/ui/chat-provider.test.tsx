import { describe, expect, vi, it } from "vitest";
import { openNewChat } from "@/lib/helpers/chat-provider-helpers";

type OpenChat = {
  withUserId: string;
  expanded: boolean;
  lastActive: Date;
};

describe("Chat Provider functionality", () => {
  describe("Handle Open Chat", () => {
    it("should add a new chat when opening a chat with a user", () => {
      const currentChats: OpenChat[] = [];
      const newChat = openNewChat(currentChats, "user123");
      expect(newChat).toEqual([
        {
          withUserId: "user123",
          expanded: true,
          lastActive: new Date(),
        },
      ]);
    });
    it("should not exceed 10 open chats", () => {
      const currentChats: OpenChat[] = Array.from({ length: 10 }, (_, i) => ({
        withUserId: `user${i}`,
        expanded: true,
        lastActive: new Date(),
      }));
      const newChat = openNewChat(currentChats, "user11");
      expect(newChat.length).toBe(10);
      expect(newChat[0].withUserId).not.toBe("user0"); // Oldest chat should be removed
      expect(newChat[0].withUserId).toBe("user1"); // New chat should be added
    });
    it("should not exceed 2 expanded with 10 chats", () => {
      vi.useFakeTimers();

      const now = new Date();
      const currentChats: OpenChat[] = [
        {
          withUserId: "user1",
          expanded: false,
          lastActive: new Date(now.getTime() - 60 * 60 * 500),
        },
        {
          withUserId: "user2",
          expanded: false,
          lastActive: new Date(now.getTime() - 60 * 60 * 600),
        },
        {
          withUserId: "user3",
          expanded: false,
          lastActive: new Date(now.getTime() - 60 * 60 * 18),
        },
        {
          withUserId: "user5",
          expanded: false,
          lastActive: new Date(now.getTime() - 60 * 60 * 16),
        },
        {
          withUserId: "user6",
          expanded: true,
          lastActive: new Date(now.getTime() - 60 * 60 * 4),
        },
        {
          withUserId: "user7",
          expanded: false,
          lastActive: new Date(now.getTime() - 60 * 60 * 12),
        },
        {
          withUserId: "user8",
          expanded: false,
          lastActive: new Date(now.getTime() - 60 * 60 * 10),
        },
        {
          withUserId: "user9",
          expanded: false,
          lastActive: new Date(now.getTime() - 60 * 60 * 8),
        },
        {
          withUserId: "user10",
          expanded: true,
          lastActive: new Date(now.getTime() - 60 * 60 * 6),
        },
      ];
      const newChat = openNewChat(currentChats, "user4");
      console.log("New Chat:", newChat);

      expect(newChat.length).toBe(10);
      expect(newChat.filter((chat) => chat.expanded).length).toBe(2); // Only 2 chats should be expanded
      expect(newChat.some((chat) => chat.withUserId === "user4")).toBe(true); // New chat should be added

      vi.useRealTimers();
    });
  });
});
