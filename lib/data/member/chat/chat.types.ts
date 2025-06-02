import type { Profile, User } from "@/app/generated/prisma";

export type Message = {
  createdAt: string;
  userId: string;
  text: string;
  User: User & {
    Profile: Profile;
  };
};
