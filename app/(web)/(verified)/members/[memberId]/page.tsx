import * as UserFeatures from "@/lib/features/user.features";
import ChatButton from "@/components/web/chat/chat-button";
import Controls from "@/components/web/members/members-member-controls";
import MemberPageClient from "@/components/web/members/members-member-page";
import { Suspense } from "react";
import LoadingSpinner from "@/components/svg/staff/loading-spinner";

type MemberPageProps = { params: Promise<{ memberId: string }> };

const MemberPageClientFallback = () => (
  <div className="w-full h-full bg-zinc-700 rounded-lg flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner text="Loading member profile..." />
    </div>
  </div>
);

export default async function MemberPage({ params }: MemberPageProps) {
  const { memberId } = await params;
  const member = UserFeatures.getMemberProfileInfo(memberId);

  return (
    <section className="min-w-[600px] flex flex-col gap-y-4 flex-1 items-center justify-start max-w-xl py-2">
      <Suspense fallback={<MemberPageClientFallback />}>
        <div className="w-full flex-1 flex flex-col gap-y-4 items-center justify-start">
          <Controls />
          <MemberPageClient memberPromise={member} />
          <ChatButton withUserId={memberId} />
        </div>
      </Suspense>
    </section>
  );
}
