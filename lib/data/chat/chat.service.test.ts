import { mockChats, userId1 } from "@/lib/__mocks__/chat.mock-data";
import prisma from "@/lib/__mocks__/prisma";
import { getChatsForUser } from "@/lib/data/chat/chat.service";
import { afterEach, beforeEach, describe, it, vi } from "vitest";

vi.mock("@/lib/prisma");

describe("Chat Service", () => {
  describe("getChatsForUser", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
      vi.resetAllMocks();
    });

    it("should return formatted chats for a user", async () => {
      vi.mocked(prisma.chat.findMany).mockResolvedValue(mockChats);

      const chats = await getChatsForUser(userId1);

      console.log("Retrieved Chats:", chats);

      // Convert chats to the desired structure: [{ message: { id, text, from } }, ...]
      const formattedChats = chats
        .map((chat) => ({
          chatId: chat.id,
          message: {
            id: chat.messages.slice(-1)[0]?.id,
            text: chat.messages.find((msg) => msg.userId !== userId1)?.text,
            from: chat.members.find((member) => member.userId !== userId1)?.user
              .Profile?.name,
          },
        }))
        .filter(
          (chat) => chat.message.id && chat.message.text && chat.message.from
        );

      console.log("Formatted Chats:", formattedChats);

      expect(Array.isArray(formattedChats)).toBe(true);
      expect(formattedChats.length).toBeGreaterThan(0);
      expect(formattedChats[0]).toHaveProperty("chatId");
      expect(formattedChats[0]).toHaveProperty("message");
      expect(formattedChats[0].message).toHaveProperty("id");
      expect(formattedChats[0].message).toHaveProperty("text");
      expect(formattedChats[0].message).toHaveProperty("from");
    });
  });
});
