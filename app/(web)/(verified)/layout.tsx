import ChatModalContainer from "@/components/web/chat/chat-modal-container";
import * as UserFeatures from "@/lib/features/user.features";
import PresenceProvider from "@/lib/providers/presence-provider";
import { redirect } from "next/navigation";

export default async function VerifiedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const doesUserHave18 = await UserFeatures.checkAge();

  if (!doesUserHave18) {
    redirect("/profile/create");
  }

  return (
    <PresenceProvider>
      {children}
      <ChatModalContainer />
    </PresenceProvider>
  );
}
