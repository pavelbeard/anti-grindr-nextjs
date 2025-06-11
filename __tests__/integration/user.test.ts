import * as userHandler from "@/app/api/user/route";
import { testApiHandler } from "next-test-api-route-handler";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { main } from "./helpers/setupdb";

vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn(() => ({
    userId: "clerk1",
  })),
}));

describe("Testing user API", () => {
  beforeEach(async () => {
    await main();
  });

  describe("GET /api/user/", () => {
    it("Should return 200 and user data", async () => {
      await testApiHandler({
        appHandler: userHandler,
        async test({ fetch }) {
          const response = await fetch({ method: "GET" });

          expect(response.status).toBe(200);

          const data = await response.json();

          expect(data).toHaveProperty("clerkUserId");
        },
      });
    });

    it("Should return 404 if user not found", async () => {});
  });
});
