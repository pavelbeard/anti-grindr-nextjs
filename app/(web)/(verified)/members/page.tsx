"use client";

import Grid from "@/components/web/members/members-grid";
import { UserProfile } from "@/lib/data/profile/profile.types";
import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchMembers({ pageParam = 0 }) {
  const response = await fetch(
    `/api/user/profile/members?offset=${pageParam}&limit=30`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch members");
  }

  const data = await response.json();
  return { members: data.members } as { members: UserProfile[] };
}

// Change for pagination fetching
export default function MembersPage() {
  //TODO: Resolve errors with pagination and fetching
  const query = useInfiniteQuery({
    queryKey: ["members"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchMembers({ pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.members.length < 30 ? undefined : lastPage.members.length;
    },
  });

  if (query.isError) {
    throw new Error("Failed to load members");
  }
  

  return (
    <section className="overflow-y-auto flex flex-col items-center">
      {query.isLoading ? (
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-500">Loading...</span>
        </div>
      ) : (
        query.data && (
          <Grid
            members={query.data.pages.flatMap((page) => page.members)}
            fetchNextPage={query.fetchNextPage}
            hasNextPage={query.hasNextPage}
            fetchingNextPage={query.isFetchingNextPage}
          />
        )
      )}
    </section>
  );
}
