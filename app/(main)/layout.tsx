import "@/components/public/style.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center layout">
      {children}
    </main>
  );
}
