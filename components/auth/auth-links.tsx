import Link from "next/link";

export default function Links() {
  return (
    <footer className="mt-12">
      <div className="flex justify-center items-center gap-8">
        <Link href="/" className="text-[0.75em] text-[var(--links-color)] text-center underline">
          Greender Home
        </Link>
        <Link
          href="/privacy-policy"
          className="text-[0.75em] text-[var(--links-color)] text-center underline"
        >
          Privacy Policy
        </Link>
        <Link
          href="/community-guidelines"
          className="text-[0.75em] text-[var(--links-color)] text-center underline"
        >
          Community guidelines
        </Link>
      </div>
    </footer>
  );
}
