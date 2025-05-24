import Link from "next/link";

export default function PrivacyPolicyTerms() {
  return (
    <section aria-label="Privacy Policy" className="mt-12">
      <p className="text-[0.75em] text-[var(--small-text-color)] text-center">
        By signing in, you continue to agree to our{" "}
        <Link
          className="text-green-600 underline hover:decoration-green-500"
          href="/terms"
        >
          Terms
        </Link>
        . Learn how we process your data in our{" "}
        <Link
          className="text-green-600 underline hover:decoration-green-500"
          href="/privacy-policy"
        >
          Privacy Policy
        </Link>
        .
        You have to be at least 18 years old to use our application.
      </p>
    </section>
  );
}
