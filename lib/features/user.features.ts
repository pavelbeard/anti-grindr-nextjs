import { Profile, User } from "@/app/generated/prisma";
import * as ProfileService from "@/lib/data/profile/profile.service";
import { UserProfile } from "@/lib/data/profile/profile.types";
import * as UserService from "@/lib/data/user/user.service";
import { auth } from "@clerk/nextjs/server";
import { DOBSchema } from "../data/profile/profile.schemas";
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

export async function createProfile({
  day,
  month,
  year,
}: {
  day: number;
  month: number;
  year: number;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new AppError("UNAUTHORIZED", "Unauthorized");
  }

  const validatedData = DOBSchema.safeParse({
    day,
    month,
    year,
  });

  if (!validatedData.success) {
    const refinedError = validatedData.error.errors.find(
      (error) => error.path[0] === "data" || error.path[0] === "year"
    );

    if (refinedError) {
      throw new AppError("BAD_REQUEST", refinedError.message);
    }

    throw new AppError("BAD_REQUEST", "Invalid date of birth");
  }

  if (await ProfileService.getProfileByUserId(userId)) {
    throw new AppError("BAD_REQUEST", "Profile already exists");
  }

  const user_data = {
    user: {
      connect: { clerkUserId: userId },
    },
    date_of_birth: new Date(
      Date.parse(
        `${validatedData.data.year}-${validatedData.data.month}-${validatedData.data.day}`
      )
    ),
  };

  return await ProfileService.createProfile(user_data);
}

export async function getCurrentUser(): Promise<User> {
  const { userId } = await auth();

  if (!userId) {
    throw new AppError("UNAUTHORIZED", "Unauthorized");
  }

  const user = await UserService.getUserById(userId);

  if (!user) {
    throw new AppError("NOT_FOUND", "User not found");
  }

  return user;
}

export async function getUserProfile(): Promise<UserProfile> {
  const { userId } = await auth();

  if (!userId) {
    throw new AppError("BAD_REQUEST", "User ID is required");
  }

  const profile = (await ProfileService.getProfileByUserId(
    userId
  )) as unknown as UserProfile;

  if (!profile) {
    throw new AppError("NOT_FOUND", "User not found");
  }

  return profile;
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

export async function changeUserOnlineStatus(
  status: ("online" | "offline") | null
): Promise<void> {
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

export async function updateProfile(data: Profile) {
  const { userId } = await auth();

  if (!userId) {
    throw new AppError("UNAUTHORIZED", "Unauthorized");
  }

  const profile = await ProfileService.getProfileByUserId(userId);

  if (!profile) {
    throw new AppError("NOT_FOUND", "Profile not found");
  }

  await ProfileService.updateProfile({
    profileId: profile.id,
    data,
  });
}
