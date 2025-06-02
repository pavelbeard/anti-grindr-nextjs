import { Profile, User } from "@/app/generated/prisma";

export type UserProfile = User & {
  Profile?: Profile;
};
