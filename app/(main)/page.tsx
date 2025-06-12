import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function LandingPage() {
  const clerk = await auth();

  return (
    <section className="flex flex-auto">
      <div className="mainContent">
        <h1 className="landingText">
          be free <br />
          from bindings.
          <br />
          you are <br />
          our focus.
        </h1>
        <p className="description">On any device, any platform, any time.</p>
        {!clerk?.userId ? (
          <Link href="/sign-in" className="signInBtn">
            Sign in with Web
          </Link>
        ) : (
          <Link href="/members" className="signInBtn">
            Go to members area
          </Link>
        )}
      </div>
    </section>
  );
}
