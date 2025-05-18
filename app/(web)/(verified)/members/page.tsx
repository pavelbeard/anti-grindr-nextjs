"use client";

import Grid from "@/components/web/members/grid";
import { Suspense } from "react";

export default function MembersPage() {
  const statuses = ["recent_connected", "online", "offline"] as const;

  // Import images statically
  const faceImages = Array.from(
    { length: 10 * 5 },
    (_, idx) => `${process.env.NEXT_PUBLIC_BASE_URL}/without-photo.png`
  );

  const mockMembers = Array.from({ length: 30 }, (_, i) => ({
    main_picture: faceImages[(i % 10) * 5 + (i % 5)],
    name: `Member ${i + 1}`,
    status: statuses[i % statuses.length],
  }));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Grid />
    </Suspense>
  );
}
