"use client";

import LoadingSpinner from "@/components/svg/staff/loading-spinner";
import Grid from "@/components/web/members/members-grid";
import { UserProfile } from "@/lib/data/profile/profile.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import Wrapper from "@/components/ui/wrapper";

const MEMBERS_PER_PAGE = 30;

async function fetchMembers({ pageParam = 0 }) {
  const response = await fetch(
    `/api/user/profile/members?offset=${pageParam * MEMBERS_PER_PAGE}&limit=${MEMBERS_PER_PAGE}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch members");
  }

  const data = await response.json();
  return { members: data.members } as { members: UserProfile[] };
}

export default function MembersPage() {
  const { showBoundary } = useErrorBoundary();
  const [page, setPage] = useState(0);
  const query = useInfiniteQuery({
    queryKey: ["members"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchMembers({ pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.members.length < MEMBERS_PER_PAGE ? undefined : page + 1;
    },
  });

  useEffect(() => {
    if (query.isError) {
      showBoundary(query.error);
    }
  }, [query.isError, query.error]);

  return (
    <Wrapper>
      {query.isLoading ? (
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner text="Loading members..." />
        </div>
      ) : (
        query.data && (
          <Grid
            members={query.data.pages.flatMap((page) => page.members)}
            fetchNextPage={() => {
              setPage((prev) => prev + 1);
              query.fetchNextPage();
            }}
            hasNextPage={query.hasNextPage}
            fetchingNextPage={query.isFetchingNextPage}
          />
        )
      )}
    </Wrapper>
  );
}
