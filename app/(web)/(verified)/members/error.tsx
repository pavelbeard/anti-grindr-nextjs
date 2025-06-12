"use client";

import { ErrorBoundaryProps } from "@/types/components";
import React from "react";

export default function ErrorLoadingMembers({
  error,
  resetErrorBoundary,
}: ErrorBoundaryProps) {
  return (
    <div className="place-self-center flex flex-col items-center justify-center">
      <h2 className="text-lg font-semibold text-white">{error.name}</h2>
      <p className="text-sm text-gray-400">{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}
