import "@/components/web/style.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./error";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <div className="flex flex-col items-center justify-center min-h-screen layout">
        {children}
      </div>
    </ErrorBoundary>
  );
}
