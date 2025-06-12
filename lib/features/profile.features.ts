import * as ProfileService from "@/lib/data/profile/profile.service";
import { UserProfile } from "@/lib/data/profile/profile.types";
import * as UserService from "@/lib/data/user/user.service";
import { auth } from "@clerk/nextjs/server";
import { AppError } from "../helpers/appError";

export async function getUserProfile() {
  const { userId } = await auth();

  if (!userId) {
    throw new AppError("UNAUTHORIZED", "Unauthorized");
  }

  const profile = await ProfileService.getProfileByUserId(userId);

  if (!profile) {
    throw new AppError("NOT_FOUND", "Profile not found");
  }

  return profile;
}

/**
 * Fetches current userProfile and members (UserProfiles) for the grid from the user service .
 * @returns {Promise<UserProfile[]>} A promise that resolves to an array of user profiles.
 */
export async function getMembers({
  offset,
  limit = 30,
}: {
  offset: number;
  limit: number;
}): Promise<UserProfile[]> {
  const { userId } = await auth();

  if (!userId) {
    throw new AppError("UNAUTHORIZED", "Unauthorized");
  }

  const members = UserService.getMembers({
    clerkUserId: userId,
    offset,
    limit,
  }) as unknown as Promise<UserProfile[]>;

  return members;
}
