import { Profile, User } from "@/app/generated/prisma";

export type UserProfile = {
  id: User["id"];
  online: User["online"];
  lastActive: User["lastActive"];
  Profile: Profile;
};
