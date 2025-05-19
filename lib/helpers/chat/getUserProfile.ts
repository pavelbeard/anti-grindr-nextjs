import { client } from "@/lib/api/client";

export default async function getUserProfile(userId: string) {
  const profile = await client(`/api/profile?userId=${userId}`, {
    method: "GET",
  });
  return profile;
}
