import LandingBanner from "@/components/landing/banner";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <LandingBanner />
      {children}
    </main>
  );
}
