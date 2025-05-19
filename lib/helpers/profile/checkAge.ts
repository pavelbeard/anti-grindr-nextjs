import * as ProfileService from "@/lib/api/profile/profile.service";
import { auth } from "@clerk/nextjs/server";

export async function checkAge() {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    throw new Error("User not authenticated");
  }

  const profile = await ProfileService.getProfileByClerkId(clerkUserId);

  if (!profile?.date_of_birth) {
    return false;
  }

  return true;
}
