import { client } from "@/lib/api/client";

export default async function getCurrentUser() {
  const { userId } = await client("/api/user", {
    method: "GET",
  });

  return userId;
}
