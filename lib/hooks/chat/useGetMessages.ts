import { fetcher } from "@/lib/fetchClient";
import useSWRInfinite from "swr/infinite";

import { Message } from "@/lib/api/member/chat/chat.types";
import { PAGE_SIZE } from "@/lib/constants";
import { useEffect } from "react";
import { mutate } from "swr";

export default function useGetMessages(chatId: string) {
  const { data, size, setSize, isValidating, error, isLoading } =
    useSWRInfinite(
      (index) =>
        `/api/chat/${chatId}?offset=${index * PAGE_SIZE}&limit=${PAGE_SIZE}`,
      fetcher
    );

  const messages: Message[] = data ? [].concat(...data.reverse()) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  useEffect(() => {
    if (!chatId) return;

    const eventSource = new EventSource(`/api/chat/${chatId}/stream`);
    eventSource.onmessage = () => {
      mutate(`/api/chat/${chatId}?offset=0&limit=${PAGE_SIZE}`);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [chatId]);
}
