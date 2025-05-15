import Link from "next/link";

import "@/components/main/style.css";

export default function LandingPage() {
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
        <Link href="/sign-in" className="signInBtn">
          Sign in with Web
        </Link>
      </div>
    </section>
  );
}
