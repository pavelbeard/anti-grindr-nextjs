import getUser from "@/lib/helpers/user/getUser";
import UserStatusClient from "./user-status-client";

export default async function UserStatus() {
  const user = await getUser();

  if (!user) return null;

  return <UserStatusClient userId={user.id} />;
}
