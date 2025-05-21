"use client";

import { useTab } from "@/lib/stores/tabs-store";
import { lazy, Suspense, useEffect, useRef } from "react";
const Grid = lazy(() => import("./grid"));
const Chats = lazy(() => import("./tabs/chats"));

import { User } from "@/app/generated/prisma";
import Loading from "@/components/staff/loading";

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
    <section className="overflow-y-auto flex flex-col items-center">
      <div
        id="start-looking-point"
        className="absolute top-16 h-16 w-full"
        ref={startLookingPointRef}
      />
      <Suspense fallback={<Loading />}>
        {tab === "grid" && <Grid userId={user.id} />}
        {tab === "gazes" && <div>Gazes</div>}
        {tab === "chats" && <Chats userId={user.id} />}
      </Suspense>
    </section>
  );
}
