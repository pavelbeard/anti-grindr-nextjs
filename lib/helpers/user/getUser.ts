import * as UserService from "@/lib/api/user/user.service";
import { auth } from "@clerk/nextjs/server";

/**
 * Get the currently authenticated user.
 */
export default async function getUser() {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    throw new Error("Clerk user ID not found");
  }

  const user = await UserService.getUserByClerkId(clerkUserId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
