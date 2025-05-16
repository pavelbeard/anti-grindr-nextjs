import * as ProfileApp from "@/lib/api/profile/profile.controller";
import CreateProfileForm from "./form";
import { redirect } from "next/navigation";

export default async function CreateProfilePage() {
  const isUserHave18 = await ProfileApp.checkAge();

  if (isUserHave18) {
    redirect("/members");
  }

  return <CreateProfileForm />;
}
