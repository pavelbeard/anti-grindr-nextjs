import { Prisma, User } from "@/app/generated/prisma";
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

export const getProfileByUserId = async (userId: string) => {
  return await prisma.profile.findUnique({
    where: {
      userId,
    },
  });
};

export const getProfileByClerkId = async (clerkUserId: string) => {
  return await prisma.$transaction(async (tx) => {
    const user = (await tx.user.findUnique({
      where: {
        clerkUserId,
      },
    })) as User;

    return await tx.profile.findUnique({
      where: {
        userId: user.id,
      },
    });
  });
};
