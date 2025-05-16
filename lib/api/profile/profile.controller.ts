import { auth } from "@clerk/nextjs/server";
import * as ProfileService from "./profile.service";

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
