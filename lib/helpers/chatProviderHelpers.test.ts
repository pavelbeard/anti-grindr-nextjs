import {
  assignChatIdToOpenChat,
  closeChat,
  OpenChat,
  openNewChat,
  toggleChatExpansion,
} from "@/lib/helpers/chatProviderHelpers";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/helpers/chatProviderHelpers", async () => {
  const actual = await vi.importActual<
    typeof import("@/lib/helpers/chatProviderHelpers")
  >("@/lib/helpers/chatProviderHelpers");
  return {
    ...actual,
  };
});

vi.mock("@/lib/features/chat.features", () => ({
  getChat: vi.fn(),
  getChatsForCurrentUser: vi.fn(),
  createChat: vi.fn(),
}));

vi.mock("@/lib/prisma");

describe("Chat Provider functionality", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Handle Open Chat", () => {
    it("should add a new chat and assign chat id when opening a chat with a user", async () => {
      const fixedDate = new Date("2023-10-01T12:00:00Z");
      vi.setSystemTime(fixedDate);

      // Import and mock the chat features
      const chatFeatures = await import("@/lib/features/chat.features");
      vi.mocked(chatFeatures.getChat).mockResolvedValue({
        id: "chat123",
        createdAt: fixedDate,
        members: [
          {
            userId: "user123",
            id: "member123",
            chatId: "chat123",
            createdAt: fixedDate,
          },
          {
            userId: "user456",
            id: "member456",
            chatId: "chat123",
            createdAt: fixedDate,
          },
        ],
      });

      const currentChats: OpenChat[] = [];
      const newChats = await openNewChat({
        currentChats,
        userIdSender: "user123",
        withNewUserId: "user456",
      });

      expect(newChats).toEqual([
        {
          userIdSender: "user123",
          userIdReceiver: "user456",
          expanded: true,
          lastActive: fixedDate,
        },
      ]);

      const updatedChats = await assignChatIdToOpenChat({
        currentChats: newChats,
        userIdReceiver: "user456",
      });

      // Check if the chatId was assigned correctly
      expect(updatedChats[0].chatId).toBe("chat123");
      expect(chatFeatures.getChat).toHaveBeenCalledWith("user456");
      // Check members are set correctly
      expect(updatedChats[0].members).toEqual([
        {
          userId: "user123",
          id: "member123",
          chatId: "chat123",
          createdAt: fixedDate,
        },
        {
          userId: "user456",
          id: "member456",
          chatId: "chat123",
          createdAt: fixedDate,
        },
      ]);
    });
    it("should not exceed 10 open chats", async () => {
      const currentChats: OpenChat[] = Array.from({ length: 10 }, (_, i) => ({
        chatId: `chat${i}`,
        userIdSender: `user${i}`,
        userIdReceiver: `user${i}`,
        expanded: true,
        lastActive: new Date(),
      }));
      const newChat = await openNewChat({
        currentChats,
        userIdSender: "user11",
        withNewUserId: "user11",
      });
      expect(newChat.length).toBe(10);
      console.log("New Chat:", newChat);

      expect(newChat[0].userIdReceiver).not.toBe("user0"); // Oldest chat should be removed
      expect(newChat[0].userIdReceiver).toBe("user1"); // New chat should be added
    });
    it("should not exceed 2 expanded with 10 chats", async () => {
      const now = new Date();
      const currentChats: OpenChat[] = [
        {
          chatId: "chat1",
          userIdSender: "user1",
          userIdReceiver: "user1",
          expanded: false,
          lastActive: new Date(now.getTime() - 60 * 60 * 500),
        },
        {
          chatId: "chat2",
          userIdSender: "user2",
          userIdReceiver: "user2",
          expanded: false,
          lastActive: new Date(now.getTime() - 60 * 60 * 600),
        },
        {
          chatId: "chat3",
          userIdSender: "user3",
          userIdReceiver: "user3",
          expanded: false,
          lastActive: new Date(now.getTime() - 60 * 60 * 18),
        },
        {
          chatId: "chat5",
          userIdSender: "user5",
          userIdReceiver: "user5",
          expanded: false,
          lastActive: new Date(now.getTime() - 60 * 60 * 16),
        },
        {
          chatId: "chat6",
          userIdSender: "user6",
          userIdReceiver: "user6",
          expanded: true,
          lastActive: new Date(now.getTime() - 60 * 60 * 4),
        },
        {
          chatId: "chat7",
          userIdSender: "user7",
          userIdReceiver: "user7",
          expanded: false,
          lastActive: new Date(now.getTime() - 60 * 60 * 12),
        },
        {
          chatId: "chat8",
          userIdReceiver: "user8",
          userIdSender: "user8",
          expanded: false,
          lastActive: new Date(now.getTime() - 60 * 60 * 10),
        },
        {
          chatId: "chat9",
          userIdReceiver: "user9",
          userIdSender: "user9",
          expanded: false,
          lastActive: new Date(now.getTime() - 60 * 60 * 8),
        },
        {
          chatId: "chat10",
          userIdReceiver: "user10",
          userIdSender: "user10",
          expanded: true,
          lastActive: new Date(now.getTime() - 60 * 60 * 6),
        },
      ];
      const newChat = await openNewChat({
        currentChats,
        userIdSender: "user4",
        withNewUserId: "user4",
      });
      expect(newChat.length).toBe(10);
      expect(newChat.filter((chat) => chat.expanded).length).toBe(2); // Only 2 chats should be expanded
      expect(newChat.some((chat) => chat.userIdReceiver === "user4")).toBe(
        true
      ); // New chat should be added
    });
  });
  describe("Handle Close Chat", () => {
    it("should remove a chat when closing a chat with a user", async () => {
      const currentChats: OpenChat[] = [
        {
          chatId: "chat123",
          userIdSender: "user123",
          userIdReceiver: "user123",
          expanded: true,
          lastActive: new Date(),
        },
      ];
      const updatedChats = await closeChat(currentChats, "user123");
      expect(updatedChats).toEqual([]);
    });
    it("should not remove any chats if the user is not found", async () => {
      const currentChats: OpenChat[] = [
        {
          chatId: "chat123",
          userIdSender: "user123",
          userIdReceiver: "user123",
          expanded: true,
          lastActive: new Date(),
        },
      ];
      const updatedChats = await closeChat(currentChats, "user456");
      expect(updatedChats).toEqual(currentChats);
    });
  });
  describe("Handle Toggle Chat Expansion", () => {
    it("should toggle the expansion state of a chat", async () => {
      const currentChats: OpenChat[] = [
        {
          chatId: "chat123",
          userIdReceiver: "user123",
          userIdSender: "user123",
          expanded: true,
          lastActive: new Date(),
        },
      ];
      const updatedChats = await toggleChatExpansion(currentChats, "user123");
      expect(updatedChats[0].expanded).toBe(false);
    });
    it("should close other chats when expanding a third chat", async () => {
      const now = new Date();
      const currentChats: OpenChat[] = [
        {
          chatId: "chat1",
          userIdSender: "user123",
          userIdReceiver: "user123",
          expanded: true,
          lastActive: new Date(now.getTime() - 60 * 60 * 500),
        },
        {
          chatId: "chat2",
          userIdSender: "user456",
          userIdReceiver: "user456",
          expanded: true,
          lastActive: new Date(now.getTime() - 60 * 60 * 600),
        },
        {
          chatId: "chat3",
          userIdSender: "user789",
          userIdReceiver: "user789",
          expanded: false,
          lastActive: new Date(now.getTime() - 60 * 60 * 18),
        },
      ];
      const updatedChats = await toggleChatExpansion(currentChats, "user789");

      console.log("Updated Chats:", updatedChats);

      expect(updatedChats[0].expanded).toBe(true);
      expect(updatedChats[1].expanded).toBe(true);
      expect(updatedChats[2].expanded).toBe(false);
    });
  });
});
