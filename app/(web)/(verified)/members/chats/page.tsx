"use client";

import LoadingSpinner from "@/components/svg/staff/loading-spinner";
import Wrapper from "@/components/ui/wrapper";
import MembersChatList from "@/components/web/members/members-chat-list";
import { ChatsForUser } from "@/types/chat.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

const CHATS_PER_PAGE = 8;

async function fetchChats({ pageParam = 0 }) {
  const response = await fetch(
    `/api/chat?offset=${pageParam * CHATS_PER_PAGE}&limit=${CHATS_PER_PAGE}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch chats");
  }

  const data = await response.json();
  return { chats: data.chats } as { chats: ChatsForUser };
}

export default function ChatsPage() {
  const { showBoundary } = useErrorBoundary();
  const [page, setPage] = useState(0);
  const query = useInfiniteQuery({
    queryKey: ["chatsCurrentUser"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchChats({ pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.chats?.length < CHATS_PER_PAGE ? undefined : page + 1;
    },
  });

  useEffect(() => {
    if (query.isError) {
      showBoundary(query.error);
    }
  }, [query.isError, query.error, showBoundary]);

  return (
    <Wrapper>
      {query.isLoading ? (
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner text="Loading chats..." />
        </div>
      ) : (
        query.data && (
          <MembersChatList
            chats={query.data.pages.flatMap((page) => page.chats)}
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
