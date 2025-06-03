import MembersClient from "@/components/web/members/members-client";
import * as ProfileFeatures from "@/lib/features/profile.features";

export default function MembersPage() {
  const members = ProfileFeatures.getMembers();

  return <MembersClient membersPromise={members} />;
}
