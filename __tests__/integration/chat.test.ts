import { afterAll, beforeAll, beforeEach, describe, it, vi } from "vitest";
import { main } from "./helpers/setupdb";

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

  describe("GET /api/chats", () => {
    it("Should return 200 and a list of chats", async () => {});

    it("Should return only each userB's chat for userA", async () => {});
  });
});
