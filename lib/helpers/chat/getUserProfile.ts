import { client } from "@/lib/fetchClient";

export default async function getUserProfile(userId: string) {
  const profile = await client(`/api/user/${userId}/profile`, {
    method: "GET",
  });
  return profile;
}
