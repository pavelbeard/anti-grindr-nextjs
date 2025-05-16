export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid grid-rows-[100px_1fr_100px] items-center justify-center min-h-screen">
      <header className="text-center">
        <h1 className="text-2xl font-bold">Members Area</h1>
      </header>
      {children}
      <footer className="flex-auto text-center">Footer</footer>
    </main>
  );
}
