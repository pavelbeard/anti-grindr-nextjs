import MembersClient from "@/components/web/members/members-client";
import * as UserFeatures from "@/lib/features/user.features";

export default function MembersPage() {
  const members = UserFeatures.getMembers();

  return <MembersClient membersPromise={members} />;
}
