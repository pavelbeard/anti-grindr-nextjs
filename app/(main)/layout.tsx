import Link from "next/link";
import { lazy, Suspense } from "react";
import LandingBanner from "@/components/main/banner";
import GreenderLogo from "@/components/main/greender-logo";
import SideNavFallback from "@/components/main/side-nav-fallback";

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
        <div className="sideNav">
          <GreenderLogo />
          <div className="h-1 bg-black" />
          <Suspense fallback={<SideNavFallback />}>
            <SideNav />
          </Suspense>
          <div className="social-media">
            <Link href="#">Facebook</Link>
            <Link href="#">Twitter</Link>
            <Link href="#">Instagram</Link>
          </div>
          <footer className="footer">
            <p>&copy; 2023 Greender. All rights reserved.</p>
            <p>
              <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
            </p>
          </footer>
        </div>
        {children}
      </div>
    </main>
  );
}
