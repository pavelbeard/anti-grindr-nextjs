"use client";

import { UserProfile } from "@/lib/data/profile/profile.types";
import formatStatus from "@/lib/helpers/formatStatus";
import { use } from "react";
import MembersCard from "./members-card";

// CHANGED
export default function Grid({
  membersPromise,
}: {
  membersPromise: Promise<UserProfile[]>;
}) {
  const members = use(membersPromise) as UserProfile[];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 bg-zinc-700 gap-0.25 px-0.25">
      {members.map((member) => (
        <MembersCard
          key={member.clerkUserId}
          member={member}
          status={formatStatus({
            online: member.online,
            lastActive: member.lastActive,
          })}
        />
      ))}
    </div>
  );
}
