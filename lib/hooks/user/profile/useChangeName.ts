import {
  UpdateNameSchema,
  type UpdateNameType,
} from "@/lib/api/user/profile/profile.schemas";
import { client } from "@/lib/fetchClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function useChangeName(userId: string) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>("");
  const form = useForm({
    resolver: zodResolver(UpdateNameSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    const fetchName = async () => {
      const profile = await client(`/api/user/${userId}/profile`, {
        method: "GET",
      });

      if (profile.name) {
        setName(profile.name);
      }
    };

    fetchName();
  }, []);

  const onSubmit = async (data: UpdateNameType) => {
    const response = await fetch(`/api/user/${userId}/profile`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setName(data.name);
    } else {
      const errorData = await response.json();
      console.error("Error updating name:", errorData);
    }
  };

  return {
    inputRef,
    name,
    form,
    onSubmit,
  };
}
