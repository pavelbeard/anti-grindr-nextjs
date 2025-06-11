import type { Profile, User } from "@/app/generated/prisma";

export type Message = {
  id: string;
  createdAt: string;
  userId: string;
  text: string;
  User?: User & {
    Profile: Profile;
  };
};

export type SimpleMessage = {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
};
