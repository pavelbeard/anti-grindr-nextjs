export default function AuthFormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-black/80 rounded-2xl backdrop-blur-2xl bg-clip-border">
      <section className="flex flex-col items-center justify-center gap-2 p-8">
        {children}
      </section>
    </main>
  );
}
