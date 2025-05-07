"use client";

import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn, isLoaded, user } = useUser();
  return <main>
    {isSignedIn ? (
      <div>
      <h1>Hello, I&apos;m Greender</h1>
      <p>Welcome to my page!</p>
    </div>
    ) : (
      <div>
        <h1>Welcome to Greender</h1>
        <p>Please sign in to see more content.</p>
      </div>
    )}
  </main>;
}
