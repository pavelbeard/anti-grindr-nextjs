import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useAddImage() {
  const form = useForm({
    resolver: zodResolver(AddImageSchema),
    initialValues: {
      file: null,
    },
  });
}
