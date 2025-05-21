import { lazy, Suspense } from "react";
import LandingBanner from "@/components/main/banner";
import GreenderLogo from "@/components/main/greender-logo";
import SideNavFallback from "@/components/main/side-nav-fallback";

import "@/components/main/style.css";

const SideNav = lazy(() => import("@/components/main/side-nav"));

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col">
      <LandingBanner />
      <div className="flex flex-auto">
        <section className="sideNav" aria-label="Side Navigation">
          <GreenderLogo />
          <div className="h-1 bg-black" />
          <Suspense fallback={<SideNavFallback />}>
            <SideNav />
          </Suspense>
          <footer className="footer">
            <p>
              &copy; 2025 Greender.
            </p>
          </footer>
        </section>
        {children}
      </div>
    </main>
  );
}
