import MembersClient from "@/components/web/members/members-client";
import getUser from "@/lib/helpers/user/getUser";

export default async function MembersPage() {
  const user = await getUser();

  return <MembersClient user={user} />;
}
