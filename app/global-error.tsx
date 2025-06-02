"use client";

import { AppError } from "@/lib/helpers/appError";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    if (error instanceof AppError) {
      router.push("/profile/create");
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-2xl font-bold text-red-600">{error.name}</h1>

      <p className="text-lg font-semibold text-white">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}
