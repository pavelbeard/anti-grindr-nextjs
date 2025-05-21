"use client";

import { useTab } from "@/lib/stores/tabs-store";
import { useEffect, useRef } from "react";
import Grid from "./grid";
import Chats from "../member/tabs/chats";
import { User } from "@/app/generated/prisma";

export default function MembersClient({ user }: { user: User }) {
  const { tab } = useTab();
  const startLookingPointRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (startLookingPointRef.current) {
      startLookingPointRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [tab]);

  return (
    <>
      <div
        id="start-looking-point"
        className="absolute top-16 h-16 w-full"
        ref={startLookingPointRef}
      />
      {tab === "grid" && <Grid userId={user.id} />}
      {tab === "gazes" && <div>Gazes</div>}
      {tab === "chats" && <Chats userId={user.id} />}
    </>
  );
}
