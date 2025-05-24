import * as messagesHandler from "@/app/api/chat/[chatId]/messages/route";
import { testApiHandler } from "next-test-api-route-handler";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import prisma from "./helpers/prisma";
import { main } from "./helpers/setupdb";

describe("Testing message API", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  beforeEach(async () => {
    await main();
  });

  describe("GET /api/messages/:chatId", () => {
    it("Should return 200 and list of messages", async () => {
      // get user1 and user2
      const user1 = await prisma.user.findUnique({
        where: { clerkUserId: "clerk1" },
        include: { Profile: true },
      });

      const user2 = await prisma.user.findUnique({
        where: { clerkUserId: "clerk2" },
        include: { Profile: true },
      });

      // get chat
      const chat = await prisma.chat.findFirst({
        where: {
          members: {
            some: {
              userId: { in: [user1!.clerkUserId, user2!.clerkUserId] },
            },
          },
        },
        include: {
          members: {
            include: {
              user: {
                include: { Profile: true },
              },
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      await testApiHandler({
        appHandler: messagesHandler,
        params: { chatId: chat!.id },
        async test({ fetch }) {
          const response = await fetch({ method: "GET" });

          expect(response.status).toBe(200);
          const data = await response.json();
          console.log("data", data);

          expect(data).toBeInstanceOf(Array);
          expect(data.length).toBe(20);
          expect(data[0].text).toBe("Message 1");
          expect(data[0].userId).toBe(user1!.clerkUserId);
          expect(data[0].profileId).toBe(user1!.Profile!.id);
        },
      });
    });
  });
});
