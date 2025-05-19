"use client";

import Grid from "@/components/web/members/grid";
import Chats from "@/components/web/member/tabs/chats";
import { useTab } from "@/lib/stores/tabs-store";
import { useEffect, useRef } from "react";

export default function MembersPage() {
  const { tab } = useTab();
  const startLookingPointRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(tab);

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
        className="mt-16"
        ref={startLookingPointRef}
      ></div>
      {tab === "members" && <Grid />}
      {tab === "gazes" && <div>Gazes</div>}
      {tab === "chats" && <Chats />}
    </>
  );
}
