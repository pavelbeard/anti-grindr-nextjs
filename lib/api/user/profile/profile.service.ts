import { Prisma } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

export const createProfile = async (user_data: Prisma.ProfileCreateInput) => {
  const { user, date_of_birth } = user_data;

  return await prisma.profile.create({
    data: {
      user,
      date_of_birth,
    },
  });
};

export const getProfileByClerkId = async (clerkUserId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      clerkUserId,
    },
  });

  return await prisma.profile.findUnique({
    where: {
      userId: user?.clerkUserId,
    },
  });
};

export const getProfileByUserId = async (userId: string) => {
  return await prisma.profile.findUnique({
    where: {
      userId,
    },
    include: {
      user: true,
    },
  });
};

export const updateProfile = async ({
  profileId,
  data,
}: {
  profileId: string;
  data: Prisma.ProfileUpdateInput;
}) => {
  return await prisma.profile.update({
    where: {
      id: profileId,
    },
    data,
  });
};
