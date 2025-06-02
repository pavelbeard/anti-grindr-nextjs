import * as UserFeatures from "@/lib/features/user.features";
import CreateProfileForm from "./form";
import { redirect } from "next/navigation";

export default async function CreateProfilePage() {
  const doesUserHave18 = await UserFeatures.checkAge();

  if (doesUserHave18) {
    redirect("/members");
  }

  return <CreateProfileForm />;
}
