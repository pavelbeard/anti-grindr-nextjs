import { GET } from "@/app/api/user/[userId]/chats/route";
import { describe, expect, it } from "vitest";

describe("Testing chat API", () => {
  describe("GET /api/:userId/chats", () => {
    it("Should return 200 and a list of chats", async () => {
      const userId = "user";
      const mockPromise = new Promise((resolve) =>
        resolve({ userId })
      ) as Promise<{ userId: string }>;
      const mockResponse = new Request(
        `http://localhost:3000/api/user/${userId}/chats`,
        {
          method: "GET",
        }
      );

      const response = await GET(mockResponse, { params: mockPromise });

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toBeInstanceOf(Array);
    });

    it("Should return only each userB's chat for userA", async () => {
      const userIdA = "cmawm3u9y0002s7g5u43zxo4h";
      const userIdB = "userB";
      const mockPromise = new Promise((resolve) =>
        resolve({ userId: userIdA })
      ) as Promise<{ userId: string }>;

      const mockResponse = new Request(
        `http://localhost:3000/api/user/${userIdA}/chats`,
        {
          method: "GET",
        }
      );

      const response = await GET(mockResponse, { params: mockPromise });

      expect(response.status).toBe(200);

      const data = await response.json();

      console.log("data", data);

      expect(data).toBeInstanceOf(Array);
      expect(data).toEqual(
        expect.arrayContaining([expect.objectContaining({ userId: userIdB })])
      );
    });
  });
});
