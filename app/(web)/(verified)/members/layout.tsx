import MembersFooter from "@/components/web/members/members-footer";
import MembersHeader from "@/components/web/members/members-header";
import "@/components/web/members/style.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorLoadingMembers from "./error";

export async function generateMetadata() {
  return {
    title: "Greender | Members Area",
    description: "Access to the members area",
  };
}

export default async function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen absolute top-0 bottom-0 left-0 right-0 grid grid-rows-[64px_1fr_96px] bg-black">
      <MembersHeader />
      <ErrorBoundary FallbackComponent={ErrorLoadingMembers}>
        {children}
      </ErrorBoundary>
      <MembersFooter />
    </main>
  );
}
