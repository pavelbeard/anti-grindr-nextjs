import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

export const createUser = async (
  clerkUserId: Prisma.UserCreateInput["clerkUserId"]
) => {
  return await prisma.user.create({
    data: {
      clerkUserId,
    },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getUsersExceptCurrent = async (
  clerkUserId: Prisma.UserWhereUniqueInput["clerkUserId"]
) => {
  return await prisma.user.findMany({
    where: {
      clerkUserId: {
        not: clerkUserId,
      },
    },
    select: {
      id: true,
      online: true,
      lastActive: true,
      Profile: true,
    },
  });
};

export const getUserByClerkId = async (
  clerkUserId: Prisma.UserWhereUniqueInput["clerkUserId"]
) => {
  return await prisma.user.findUnique({
    where: {
      clerkUserId,
    },
  });
};

export const updateUser = async ({
  userId,
  clerkUserId,
  data,
}: {
  userId?: Prisma.UserWhereUniqueInput["id"];
  clerkUserId?: Prisma.UserWhereUniqueInput["clerkUserId"];
  data: Prisma.UserUpdateInput;
}) => {
  if (!userId && !clerkUserId) {
    throw new Error("Either userId or clerkUserId must be provided");
  }

  if (userId) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
  }

  if (clerkUserId) {
    return await prisma.user.update({
      where: {
        clerkUserId,
      },
      data,
    });
  }
};

export const deleteUser = async (
  clerkUserId: Prisma.UserWhereUniqueInput["clerkUserId"]
) => {
  await prisma.user.delete({
    where: {
      clerkUserId,
    },
  });
};
