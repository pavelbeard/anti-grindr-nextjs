"use client";

import { Form } from "@/components/ui/form";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";

export default function AddImageForm() {
  const form = useForm({
    resolver: zodResolver(AddImageSchema),
    defaultValues: {
      file: null,
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="w-24 h-32 bg-zinc-300 rounded-lg flex justify-center items-center">
      <PlusCircleIcon className="size-12 text-zinc-500" />
      {isOpen &&
        createPortal(
          <>
            <Form></Form>
          </>,
          document.body
        )}
    </div>
  );
}
