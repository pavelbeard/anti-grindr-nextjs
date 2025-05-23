import { GET } from "@/app/api/messages/[chatId]/route";
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
// import { PAGE_SIZE } from "@/lib/constants";
// import { Message } from "@/app/generated/prisma";

describe("Testing message API", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  beforeEach(async () => {
    // Create Genders and Pronouns (required for Profile relations)
    const [maleGender, femaleGender] = await Promise.all([
      prisma.gender.create({
        data: { name: "male" },
      }),
      prisma.gender.create({
        data: { name: "female" },
      }),
    ]);

    const [hePronoun, shePronoun] = await Promise.all([
      prisma.pronoun.create({
        data: { name: "he_him_his" },
      }),
      prisma.pronoun.create({
        data: { name: "she_her_hers" },
      }),
    ]);

    // Create Users
    const user1 = await prisma.user.create({
      data: {
        clerkUserId: "clerk1",
        online: true,
        Profile: {
          create: {
            name: "Alice",
            height: 170,
            weight: 65,
            bio: "Hello, I am Alice.",
            genders: { connect: { id: femaleGender.id } },
            pronouns: { connect: { id: shePronoun.id } },
          },
        },
      },
      include: { Profile: true },
    });

    const user2 = await prisma.user.create({
      data: {
        clerkUserId: "clerk2",
        online: true,
        Profile: {
          create: {
            name: "Bob",
            height: 180,
            weight: 80,
            bio: "Hey, I am Bob.",
            genders: { connect: { id: maleGender.id } },
            pronouns: { connect: { id: hePronoun.id } },
          },
        },
      },
      include: { Profile: true },
    });

    // Create Chat
    const chat = await prisma.chat.create({
      data: {
        members: {
          create: [{ userId: user1.id }, { userId: user2.id }],
        },
      },
    });

    // Create 100 Messages (alternating users)
    const messagesData = Array.from({ length: 100 }).map((_, i) => ({
      text: `Message ${i + 1}`,
      chatId: chat.id,
      userId: i % 2 === 0 ? user1.id : user2.id,
      profileId: i % 2 === 0 ? user1.Profile!.id : user2.Profile!.id,
      createdAt: new Date(Date.now() - (100 - i) * 1000), // spread out timestamps
    }));

    await prisma.message.createMany({ data: messagesData });
  });

  describe("GET /api/messages/:chatId", () => {
    it("Should return 200 and list of messages", async () => {
      const chatId = "cmb10r2do0004s7495pzlxt5p";

      const mockPromise = new Promise((resolve) =>
        resolve({ chatId })
      ) as Promise<{ chatId: string }>;
      const mockResponse = new Request(
        `http://localhost:3000/api/messages/${chatId}`,
        {
          method: "GET",
        }
      );

      const response = await GET(mockResponse, { params: mockPromise });
      expect(response.status).toBe(200);
      const data = await response.json();
      console.log("data", data);

      expect(data).toBeInstanceOf(Array);
    });
  });
});
