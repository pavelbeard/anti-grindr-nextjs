import { auth } from "@clerk/nextjs/server";
import UserStatusClient from "./user-status-client";

export default async function UserStatus() {
  const { userId } = await auth();

  if (userId) {
    return <UserStatusClient />;
  }

  return null;
}
