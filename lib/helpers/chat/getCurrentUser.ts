import { client } from "@/lib/fetchClient";

export default async function getCurrentUser() {
  const { userId } = await client("/api/user", {
    method: "GET",
  });

  return userId;
}
