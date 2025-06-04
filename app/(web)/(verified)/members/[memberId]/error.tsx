"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-4 items-center justify-center min-h-screen bg-black">
      <h1 className="text-2xl font-bold text-red-600">{error.message}</h1>
      <p className="text-lg font-semibold text-white">
        The member you are looking for does not exist.
      </p>
      <Button
        className="bg-blue-500 hover:bg-blue-400 cursor-pointer"
        onClick={() => router.back()}
      >
        Go back
      </Button>
    </div>
  ); // Return null to avoid rendering anything if the error is not handled
}
