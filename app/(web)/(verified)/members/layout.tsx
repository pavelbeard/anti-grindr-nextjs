import IconsSet from "@/components/web/members/Icons-set";
import { UserButton } from "@clerk/nextjs";

export async function generateMetadata() {
  return {
    title: "Greender | Members Area",
    description: "Access to the members area",
  };
}

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="text-center sticky top-0 flex items-center gap-x-4 w-full bg-black h-16 p-4">
        {/* PROFILE */}
        <UserButton />
        <h1 className="text-2xl font-bold text-white">Members Area</h1>
      </header>
      <main className="min-h-screen">
        <section className="overflow-y-auto flex justify-center items-center">
          {children}
        </section>
      </main>
      <footer className="sticky bottom-0 w-full bg-black h-24 p-4 text-center">
        <IconsSet />
      </footer>
    </>
  );
}
