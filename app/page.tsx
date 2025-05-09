"use client";

import { useUser } from "@clerk/nextjs";
import GreenderBackground from "@/app/assets/background.png";
import GreenderMainBackground from "@/app/assets/muscular_men_hugging.png";

export default function Home() {
  const { isSignedIn, isLoaded, user } = useUser();
  return (
    <main
      className="min-h-screen bg-[#E8B94E]"
      style={{
        backgroundImage: `url(${GreenderMainBackground.src})`,
        backgroundSize: "cover",
        backgroundPositionX: "0",
      }}
    >
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
    </main>
  );
}
