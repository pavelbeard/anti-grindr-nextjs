import { checkAge } from "@/lib/helpers/user/profile/checkAge";
import CreateProfileForm from "./form";
import { redirect } from "next/navigation";
import getUser from "@/lib/helpers/user/getUser";

export default async function CreateProfilePage() {
  const isUserHave18 = await checkAge();
  const user = await getUser();

  if (isUserHave18) {
    redirect("/members");
  }

  return <CreateProfileForm userId={user.id} />;
}
