import { checkAge } from "@/lib/helpers/profile/checkAge";
import CreateProfileForm from "./form";
import { redirect } from "next/navigation";

export default async function CreateProfilePage() {
  const isUserHave18 = await checkAge();

  if (isUserHave18) {
    redirect("/members");
  }

  return <CreateProfileForm />;
}
