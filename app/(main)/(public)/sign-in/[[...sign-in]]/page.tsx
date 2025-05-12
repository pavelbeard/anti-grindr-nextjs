"use client";

import GreenderLogo from "@/app/components/public/sign-in/greender-logo";

import Form from "./form";

export default function SignInPage() {
  return (
    <main
      
    >
      <section className="bg-black/80 rounded-2xl backdrop-blur-2xl bg-clip-border">
        <div className="flex flex-col items-center justify-center gap-2 p-8">
          <GreenderLogo />
          <Form />
        </div>
      </section>
    </main>
  );
}
