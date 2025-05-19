import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DOBSchema, DOBType } from "../../api/profile/profile.schemas";

export default function useCreateProfile() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(DOBSchema),
    defaultValues: {
      day: "",
      month: "",
      year: "",
    },
  });

  const [errorState, setErrorState] = useState(false);
  const [errorIssue, setErrorIssue] = useState<string | null>(null);

  useEffect(() => {
    const { day, month, year } = form.getValues();

    if (day && month && year) {
      console.log("day", day);

      const validatedDate = DOBSchema.safeParse({ day, month, year });

      if (!validatedDate.success) {
        const refinedError = validatedDate.error.errors.find(
          (error) => error.path[0] === "data" || error.path[0] === "year"
        );

        if (refinedError) {
          setErrorState(true);
          return setErrorIssue(refinedError.message);
        }
      }
    }

    setErrorState(false);
    setErrorIssue(null);
  }, [form.watch("day"), form.watch("month"), form.watch("year")]);

  const onSubmit = async (data: DOBType) => {
    const response = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Profile created successfully");
      router.push("/members");
    } else {
      const errorData = await response.json();
      console.error("Error creating profile:", errorData);
    }
  };

  return {
    form,
    errorState,
    errorIssue,
    onSubmit,
  };
}
