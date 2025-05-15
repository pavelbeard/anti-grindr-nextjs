import LandingBanner from "@/components/landing/banner";
import GreenderLogo from "@/components/landing/greender-logo";
import Link from "next/link";

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
          <nav className="sideNavLinks">
            <Link href="/" className="sideNavLink">
              <div className="sideNavLinkPadding">download</div>
            </Link>
            <Link href="/about" className="sideNavLink">
              <div className="sideNavLinkPadding">about</div>
            </Link>
            <Link href="/blog" className="sideNavLink">
              <div className="sideNavLinkPadding">blog</div>
            </Link>
            <Link href="/contact" className="sideNavLink">
              <div className="sideNavLinkPadding">contact</div>
            </Link>
          </nav>
          <div className="social-media">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
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
