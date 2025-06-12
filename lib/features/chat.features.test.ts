import { getChatsForCurrentUser } from "@/lib/features/chat.features";
import { beforeEach, describe, it, vi } from "vitest";
import { mockChats } from "../__mocks__/chat.mock-data";
import prisma from "../__mocks__/prisma";

vi.mock("@/lib/prisma");
vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn(() => ({
    userId: "user123",
  })),
}));

describe("Chat Features", () => {
  describe("getChatsForCurrentUser", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
      vi.resetAllMocks();
    });

    it("should return the formatted chat for the current user", async () => {
      // Mock the Prisma client to return a predefined set of chats
      prisma.chat.findMany.mockResolvedValue(mockChats);

      const chats = await getChatsForCurrentUser();

      expect(Array.isArray(chats)).toBe(true);
      expect(chats.length).toBeGreaterThan(0);
      expect(chats[0]).toHaveProperty("message");
      expect(chats[0].message).toHaveProperty("id");
      expect(chats[0].message).toHaveProperty("text");
      expect(chats[0].message).toHaveProperty("from");
    });
  });
});
