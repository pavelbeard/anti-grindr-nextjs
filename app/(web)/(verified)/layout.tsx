import ChatModal from "@/components/web/members/chat/chat-modal";
import * as UserFeatures from "@/lib/features/user.features";
import { ChatProvider } from "@/lib/providers/chat/chat-provider";
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
    <ChatProvider>
      {children}
      <ChatModal />
    </ChatProvider>
  );
}
