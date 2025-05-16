import * as ProfileApp from "@/lib/api/profile/profile.controller";
import { redirect } from "next/navigation";

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isUserHave18 = await ProfileApp.checkAge();

  if (!isUserHave18) {
    redirect("/profile/create");
  }

  return children;
}
