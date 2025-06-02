"use client";

export default function ErrorPage({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="text-lg">
          You must be at least 18 years old to create a profile.
        </p>
      </div>
    </div>
  );
}
