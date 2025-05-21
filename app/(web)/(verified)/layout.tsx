import { checkAge } from "@/lib/helpers/user/profile/checkAge";
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

  return children;
}
