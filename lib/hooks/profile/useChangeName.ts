import {
  UpdateNameSchema,
  type UpdateNameType,
} from "@/lib/data/profile/profile.schemas";
import { client } from "@/lib/fetchClient";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  startTransition,
  useEffect,
  useOptimistic,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";

export default function useChangeName() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState({ value: "", sending: false });
  const form = useForm({
    resolver: zodResolver(UpdateNameSchema),
    defaultValues: {
      name: "",
    },
  });

  const [optimisticName, addOptimistic] = useOptimistic(
    name,
    (state, newName) => ({
      ...state,
      value: newName as string,
      sending: true,
    })
  );

  useEffect(() => {
    const fetchName = async () => {
      const profile = await client(`/api/user/profile`, {
        method: "GET",
      });

      if (profile.name) {
        setName({ value: profile.name, sending: false });
      }
    };

    fetchName();
  }, []);

  const onSubmit = async (data: UpdateNameType) => {
    startTransition(async () => {
      addOptimistic(data.name);
      const response = await fetch(`/api/user/profile`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating name:", errorData);
        return;
      }

      setName({ value: data.name, sending: false });
    });
  };

  return {
    inputRef,
    name: optimisticName || name,
    form,
    onSubmit,
  };
}
