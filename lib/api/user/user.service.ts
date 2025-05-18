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

export const updateUser = async (
  clerkUserId: Prisma.UserWhereUniqueInput["clerkUserId"],
  data: Prisma.UserUpdateInput
) => {
  return await prisma.user.update({
    where: {
      clerkUserId,
    },
    data,
  });
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
