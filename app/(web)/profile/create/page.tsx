import { checkAge } from "@/lib/helpers/user/profile/checkAge";
import CreateProfileForm from "./form";
import { redirect } from "next/navigation";

export default async function CreateProfilePage() {
  const isUserHave18 = await checkAge();

  if (isUserHave18) {
    redirect("/members");
  }

  return <CreateProfileForm />;
}
