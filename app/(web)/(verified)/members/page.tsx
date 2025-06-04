import MembersClient from "@/components/web/members/members-client";
import Grid from "@/components/web/members/members-grid";
import * as ProfileFeatures from "@/lib/features/profile.features";

export default function MembersPage() {
  const members = ProfileFeatures.getMembers();

  // return <MembersClient membersPromise={members} />;
  return (
    <section className="overflow-y-auto flex flex-col items-center">
      <Grid membersPromise={members} />
    </section>
  );
}
