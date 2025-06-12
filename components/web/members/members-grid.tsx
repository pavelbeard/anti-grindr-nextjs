"use client";

import { UserProfile } from "@/lib/data/profile/profile.types";
import formatStatus from "@/lib/helpers/formatStatus";
import { useEffect, useRef } from "react";
import MembersCard from "./members-card";
import LoadingSpinner from "@/components/svg/staff/loading-spinner";
import LoadingInfScroll from "@/components/ui/loading-inf-scroll";

interface GridProps {
  members: UserProfile[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  fetchingNextPage: boolean;
}

// CHANGED
export default function Grid({
  members,
  fetchNextPage,
  hasNextPage,
  fetchingNextPage,
}: GridProps) {
  const membersContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = membersContainer.current;
    if (!container) return;

    const loadNewMembers = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollHeight - scrollTop === clientHeight) {
        if (hasNextPage) {
          // Check if there are more pages to fetch
          fetchNextPage();
        }
      }
    };

    container.addEventListener("scroll", loadNewMembers);
    return () => {
      container.removeEventListener("scroll", loadNewMembers);
    };
  }, []);

  return (
    <div
      ref={membersContainer}
      className="relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 bg-zinc-700 gap-0.25 px-0.25 overflow-y-auto max-w-[1200px]"
    >
      {members.length === 0 ? (
        <p className="col-span-full text-white mt-2 place-self-center">
          No members found.
        </p>
      ) : (
        members.map((member) => (
          <MembersCard
            key={member.clerkUserId}
            member={member}
            status={formatStatus({
              online: member.online,
              lastActive: member.lastActive,
            })}
          />
        ))
      )}
      {fetchingNextPage && <LoadingInfScroll text="Loading more members..." />}
    </div>
  );
}
