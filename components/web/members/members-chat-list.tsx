"use client";

import { useEffect, useRef } from "react";
import ChatItem from "./members-chat-item";
import { ChatsForUser } from "@/types/chat.types";
import LoadingInfScroll from "@/components/ui/loading-inf-scroll";

interface MembersChatListProps {
  chats: ChatsForUser;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  fetchingNextPage: boolean;
}

export default function MembersChatList({
  chats,
  fetchNextPage,
  hasNextPage,
  fetchingNextPage,
}: MembersChatListProps) {
  const chatListContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chatListContainer.current;
    if (!container) return;

    const loadNewChats = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollHeight - scrollTop === clientHeight) {
        console.log(hasNextPage);
        if (hasNextPage) {
          console.log("Fetching next page of chats");
          fetchNextPage();
        }
      }
    };

    container.addEventListener("scroll", loadNewChats);
    return () => {
      container.removeEventListener("scroll", loadNewChats);
    };
  }, []);

  return (
    <div
      ref={chatListContainer}
      className="flex flex-col gap-y-4 items-start justify-start w-full p-4 overflow-y-auto"
    >
      {chats?.length === 0 ? (
        <p className="text-white mt-2 place-self-center ">No chats yet.</p>
      ) : (
        chats?.map((chat) => <ChatItem key={chat?.chatId} chat={chat} />)
      )}
      {fetchingNextPage && <LoadingInfScroll text="Loading more chats..." />}
    </div>
  );
}
