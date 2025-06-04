import { ErrorBoundary } from "react-error-boundary";
import Error from "./error";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <div className="flex flex-col w-full justify-center items-center">
        {children}
      </div>
    </ErrorBoundary>
  );
}
