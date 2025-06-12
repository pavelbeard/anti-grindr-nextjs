import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

export const createUser = async (clerkUserId: string) => {
  return await prisma.user.create({
    data: {
      clerkUserId,
    },
  });
};

// CHANGED
export const createUserLocation = async ({
  clerkUserId,
  latitude,
  longitude,
}: {
  clerkUserId: string;
  latitude: number;
  longitude: number;
}) => {
  return await prisma.location.create({
    data: {
      user: {
        connect: {
          clerkUserId,
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

/** 
  Get all users except the current user
  @param clerkUserId - The ID of the current user
  @returns An array of users excluding the current user
*/
export const getMembers = async ({
  clerkUserId,
  offset = 0,
  limit = 30,
}: {
  clerkUserId: string;
  offset: number;
  limit: number;
}) => {
  return await prisma.user.findMany({
    where: {
      clerkUserId: {
        not: clerkUserId,
      },
    },
    select: {
      clerkUserId: true,
      online: true,
      lastActive: true,
      Profile: true,
    },
    skip: offset,
    take: limit,
  });
};

export const getUserById = async (clerkUserId: string) => {
  return await prisma.user.findUnique({
    where: {
      clerkUserId,
    },
  });
};

// CHANGED
export const updateUser = async ({
  clerkUserId,
  data,
}: {
  clerkUserId: string;
  data: Prisma.UserUpdateInput;
}) => {
  return await prisma.user.update({
    where: {
      clerkUserId,
    },
    data,
  });
};

// CHANGED
export const deleteUser = async (clerkUserId: string) => {
  await prisma.user.delete({
    where: {
      clerkUserId,
    },
  });
};
