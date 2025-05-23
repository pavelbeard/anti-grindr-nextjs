import * as ProfileService from "@/lib/api/user/profile/profile.service";
import { auth } from "@clerk/nextjs/server";

export async function checkAge() {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    return false;
  }

  const profile = await ProfileService.getProfileByClerkId(clerkUserId);

  if (!profile?.date_of_birth) {
    return false;
  }

  return true;
}
