"use client";

import Link from "next/link";
import { use } from "react";

type Params = Promise<{ id: string }>;

export default function MemberPage(props: { params: Params }) {
  const params = use(props.params);
  const { id: userId } = params;

  return (
    <div className="min-h-screen bg-zinc-200 ">
      Member Page
      <section>
        <p>This is the member section where you can find member details.</p>
        <Link href={`/member/${userId}/chat`}>Send Message</Link>
      </section>
    </div>
  );
}
