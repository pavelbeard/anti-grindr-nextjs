"use client";

import { useTab } from "@/lib/stores/tabs-store";
import { Suspense, useEffect, useRef } from "react";
import { UserProfile } from "@/lib/data/user/profile.types";
import Loading from "@/components/staff/loading";
import Grid from "./members-grid";
import Chats from "./tabs/tab-chats";

// CHANGED
export default function MembersClient({
  membersPromise,
}: {
  membersPromise: Promise<UserProfile[]>;
}) {
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
    <section className="overflow-y-auto flex flex-col items-center">
      <div
        id="start-looking-point"
        className="absolute top-16 h-16 w-full"
        ref={startLookingPointRef}
      />
      <Suspense fallback={<Loading />}>
        {tab === "" ||
          (tab === "grid" && <Grid membersPromise={membersPromise} />)}
        {tab === "gazes" && <div>Gazes</div>}
        {tab === "chats" && <Chats />}
      </Suspense>
    </section>
  );
}
