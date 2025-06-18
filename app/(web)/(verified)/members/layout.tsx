import MembersFooter from "@/components/web/members/members-footer";
import MembersHeader from "@/components/web/members/members-header";
import "@/components/web/members/style.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorLoadingMembers from "./error";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import MembersSidebar from "@/components/web/members/members-sidebar";

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
    <SidebarProvider>
      <MembersSidebar />
      <div className="overflow-y-auto h-screen w-full flex flex-col bg-black">
        <MembersHeader />
        <ErrorBoundary FallbackComponent={ErrorLoadingMembers}>
          {children}
        </ErrorBoundary>
        <MembersFooter />
      </div>
    </SidebarProvider>
  );
}
