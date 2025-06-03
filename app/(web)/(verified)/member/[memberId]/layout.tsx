import { ErrorBoundary } from "react-error-boundary";
import Error from "./error";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <main className="min-h-screen flex flex-col justify-start items-center bg-black text-white">
        {children}
      </main>
    </ErrorBoundary>
  );
}
