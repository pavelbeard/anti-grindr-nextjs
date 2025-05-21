export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col justify-start items-center bg-black text-white">
      {children}
    </main>
  );
}
