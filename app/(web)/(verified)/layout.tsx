import ChatModal from "@/components/web/members/chat/chat-modal";
import { checkAge } from "@/lib/helpers/user/profile/checkAge";
import { ChatProvider } from "@/lib/providers/chat-provider";
import { redirect } from "next/navigation";

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isUserHave18 = await checkAge();

  if (!isUserHave18) {
    redirect("/profile/create");
  }

  return (
    <ChatProvider>
      {children}
      <ChatModal />
    </ChatProvider>
  );
}
