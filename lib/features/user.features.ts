import * as ProfileService from "@/lib/data/user/profile.service";
import * as UserService from "@/lib/data/user/user.service";
import { auth } from "@clerk/nextjs/server";
import { UserProfile } from "../data/user/profile.types";
import { AppError } from "../helpers/appError";
import doesHave18 from "../helpers/doesHave18";

export async function checkAge() {
  const { userId } = await auth();

  if (!userId) {
    throw new AppError("UNAUTHORIZED", "Unauthorized");
  }

  const profile = await ProfileService.getProfileByUserId(userId);

  if (!profile?.date_of_birth) {
    return false;
  }

  return doesHave18(profile.date_of_birth);
}

export async function changeStatus(status: ("online" | "offline") | null) {
  const { userId } = await auth();

  if (!userId) {
    throw new AppError("UNAUTHORIZED", "Unauthorized");
  }

  if (!status) {
    throw new AppError("BAD_REQUEST", "Missing status");
  }

  await UserService.updateUser({
    clerkUserId: userId,
    data: {
      online: status === "online",
      lastActive: new Date(),
    },
  });
}

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

/*
 * Fetches current userProfile and members for the grid from the user service .
 * @returns {Promise<UserProfile[]>} A promise that resolves to an array of user profiles.
 */
export async function getMembers(): Promise<UserProfile[]> {
  const { userId } = await auth();

  if (!userId) {
    throw new AppError("UNAUTHORIZED", "Unauthorized");
  }

  const members = UserService.getMembers(userId) as unknown as Promise<
    UserProfile[]
  >;

  return members;
}
