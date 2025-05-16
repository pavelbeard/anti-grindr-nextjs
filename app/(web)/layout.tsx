export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-auto flex flex-col bg-[var(--bg-image-public)]">
      {children}
    </main>
  );
}
