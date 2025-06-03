"use client";

import ErrorPage from "@/app/global-error";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient();

export default function TopLayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <ClerkProvider>{children}</ClerkProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
