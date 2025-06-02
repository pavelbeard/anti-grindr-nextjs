import * as chatHandler from "@/app/api/chat/route";
import { testApiHandler } from "next-test-api-route-handler";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import resetDb from "./helpers/resetDb";
import { main } from "./helpers/setupdb";

vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn(() => ({
    userId: "clerk1",
  })),
}));

describe("Testing chat API", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  beforeEach(async () => {
    await main();
  });

  afterEach(async () => {
    await resetDb();
  });

  describe("GET /api/chat", () => {
    it("Should return 200 and a list of chats", async () => {
      await testApiHandler({
        appHandler: chatHandler,
        async test({ fetch }) {
          const response = await fetch({ method: "GET" });

          expect(response.status).toBe(200);

          const data = await response.json();

          console.log("Chat data:", JSON.stringify(data, null, 2));

          expect(data).toBeInstanceOf(Array);
          expect(data.length).toBeGreaterThan(0);
          expect(data[0]).toHaveProperty("id");
          expect(data[0]).toHaveProperty("members");
          expect(data[0]).toHaveProperty("messages");
        },
      });
    });

    it("Should return only each userB's chat for userA", async () => {});
  });
});
