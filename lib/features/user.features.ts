import * as ProfileService from "@/lib/data/profile/profile.service";
import { UserProfile } from "@/lib/data/profile/profile.types";
import * as UserService from "@/lib/data/user/user.service";
import { auth } from "@clerk/nextjs/server";
import { AppError } from "../helpers/appError";
import doesHave18 from "../helpers/doesHave18";
import formatStatus from "../helpers/formatStatus";
import setLastActiveAgo from "../helpers/setLastActiveAgo";

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

export async function getMemberById(memberId: string): Promise<UserProfile> {
  if (!memberId) {
    throw new AppError("BAD_REQUEST", "Member ID is required");
  }

  const member = (await ProfileService.getProfileByUserId(
    memberId
  )) as unknown as UserProfile;

  if (!member) {
    throw new AppError("NOT_FOUND", "Member not found");
  }

  return member;
}

export async function getMemberProfileInfo(memberId: string) {
  if (!memberId) {
    throw new AppError("BAD_REQUEST", "Member ID is required");
  }

  const profile = await ProfileService.getProfileByUserId(memberId);

  if (!profile) {
    throw new AppError("NOT_FOUND", "Member not found");
  }

  const profileBirthday = profile?.date_of_birth as Date;
  const currentYear = new Date()?.getFullYear();
  const birthYear = profileBirthday?.getFullYear();
  const age = currentYear - birthYear;

  const lastActiveAgo = setLastActiveAgo(profile.user.lastActive);

  const status = formatStatus({
    online: profile.user.online,
    lastActive: profile.user.lastActive,
  });

  const showStatistics = [
    profile?.sexRole,
    profile?.height,
    profile?.weight,
  ].some(Boolean);

  const showBio = profile?.bio && profile.bio.length > 0;

  const name = profile.name;
  const avatar = profile.avatar;

  const height = profile?.height;
  const weight = profile?.weight;
  const sexRole = profile?.sexRole;
  const bio = profile?.bio;

  return {
    age,
    lastActiveAgo,
    status,
    showStatistics,
    showBio,
    name,
    avatar,
    height,
    weight,
    sexRole,
    bio,
  };
}
