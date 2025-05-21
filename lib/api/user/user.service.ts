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

export const createUserLocation = async ({
  userId,
  latitude,
  longitude,
}: {
  userId: string;
  latitude: number;
  longitude: number;
}) => {
  return await prisma.location.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      latitude,
      longitude,
    },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

/*
  Get all users except the current user
  @param userId - The ID of the current user
  @returns An array of users excluding the current user
*/
export const getMembers = async (userId: string) => {
  return await prisma.user.findMany({
    where: {
      id: {
        not: userId,
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

export const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
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
  return await prisma.$transaction(async (tx) => {
    if (!userId && !clerkUserId) {
      throw new Error("Either userId or clerkUserId must be provided");
    }

    if (userId) {
      return await tx.user.update({
        where: {
          id: userId,
        },
        data,
      });
    }
    if (clerkUserId) {
      return await tx.user.update({
        where: {
          clerkUserId,
        },
        data,
      });
    }
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
