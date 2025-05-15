"use client";

import * as SignUp from "@clerk/elements/sign-up";
import * as Clerk from "@clerk/elements/common";
import { useClerk } from "@clerk/nextjs";
import LoadingAuth from "@/components/auth/loading-auth";

import "@/components/public/style.css";
import Link from "next/link";

export default function SignUpForm() {
  const clerk = useClerk();

  if (!clerk.loaded) {
    return <LoadingAuth />;
  }

  return (
    <SignUp.Root>
      <SignUp.Step
        name="start"
        className="flex flex-col gap-4 items-center w-80"
      >
        <Clerk.GlobalError className="block text-sm text-rose-400" />
        <Clerk.Field name="emailAddress" className="field">
          <Clerk.Label className="text-xs font-light text-[var(--label-color)]">
            Email
          </Clerk.Label>
          <Clerk.Input
            placeholder="Email"
            required
            className="outline-none placeholder:text-[var(--placeholder-color)] "
          />
        </Clerk.Field>
        <Clerk.Field name="password" className="field">
          <Clerk.Label className="text-xs font-light text-[var(--label-color)]">
            Password
          </Clerk.Label>
          <Clerk.Input
            type="password"
            placeholder="Password"
            required
            className="outline-none placeholder:text-[var(--placeholder-color)]"
          />
          <Clerk.FieldError className="block text-sm text-rose-400" />
        </Clerk.Field>
        <SignUp.Action className="action" submit>
          Sign up
        </SignUp.Action>

        <div className="flex items-center justify-center gap-2 w-full">
          <div className="h-0.5 w-full bg-zinc-600"></div>
          <p className="text-white" data-localization-key="divider-text">
            or
          </p>
          <div className="h-0.5 w-full bg-zinc-600"></div>
        </div>

        <Clerk.Connection name="google" className="w-full">
          <div className="connection">
            <Clerk.Icon className="size-4" />
            Sign up with Google
          </div>
        </Clerk.Connection>

        <p className="p-2 text-[0.75em] text-[var(--small-text-color)] text-center">
          Do you already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-green-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>

        {/* if I would achieve ever apple values for apple SSO */}

        {/* <Clerk.Connection name="apple" className="w-full">
          <div className={signUpStyle.connection}>
            <Clerk.Icon className="size-4" />
            Sign up with Apple
          </div>
        </Clerk.Connection> */}
      </SignUp.Step>

      <div id="clerk-captcha" />

      <SignUp.Step
        name="verifications"
        className="flex flex-col gap-4 items-center w-80"
      >
        <Clerk.GlobalError className="block text-sm text-red-400" />
        <SignUp.Strategy name="email_code">
          <Clerk.Field name="code" className="field">
            <Clerk.Label className="text-xs font-light text-[var(--label-color)]">
              Verification Code
            </Clerk.Label>
            <Clerk.Input
              type="otp"
              required
              className="outline-none placeholder:text-[var(--placeholder-color)]"
            />
            <Clerk.FieldError className="block text-sm text-rose-400" />
          </Clerk.Field>
          <SignUp.Action className="action" submit>
            Verify
          </SignUp.Action>
        </SignUp.Strategy>
      </SignUp.Step>
    </SignUp.Root>
  );
}
