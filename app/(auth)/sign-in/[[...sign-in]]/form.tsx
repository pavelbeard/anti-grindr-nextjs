"use client";

import * as SignIn from "@clerk/elements/sign-in";
import * as Clerk from "@clerk/elements/common";
import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import LoadingAuth from "@/components/auth/loading-auth";

type SignInProps = {
  setOpen: (open: boolean) => void;
};

function EmailForm({ setOpen }: SignInProps) {
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });

  const [signInEnabled, setSignInEnabled] = useState(false);

  useEffect(() => {
    setSignInEnabled(
      Object.values(credentials).every((value) => value.length > 0)
    );
  }, [credentials]);

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <button
          onClick={() => setOpen(false)}
          className="hover:bg-white/10 p-2 rounded-full"
        >
          <ArrowLeftIcon className="size-6 text-white" />
        </button>
        <Link
          href="/sign-up"
          className="text-green-600 font-semibold hover:underline"
        >
          Create account
        </Link>
      </div>
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="flex flex-col gap-4 items-center w-80"
        >
          <Clerk.GlobalError className="block text-sm text-rose-400" />
          <Clerk.Field name="identifier" className="field">
            <Clerk.Label className="text-xs font-light text-[var(--label-color)]">
              Email
            </Clerk.Label>
            <Clerk.Input
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  identifier: e.target.value,
                }))
              }
              required
              placeholder="Email"
              className="outline-none placeholder:text-[var(--placeholder-color)]"
            />
            <Clerk.FieldError className="block text-sm text-rose-400" />
          </Clerk.Field>
          <Clerk.Field name="password" className="field">
            <Clerk.Label className="text-xs font-light text-[var(--label-color)]">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              required
              placeholder="Password"
              className="outline-none placeholder:text-[var(--placeholder-color)]"
            />
            <Clerk.FieldError className="block text-sm text-rose-400" />
          </Clerk.Field>
          <SignIn.Action disabled={!signInEnabled} className="action" submit>
            Sign in
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </>
  );
}

function SignInButtons({ setOpen }: SignInProps) {
  return (
    <SignIn.Root>
      <SignIn.Step
        name="start"
        className="flex flex-col gap-4 items-center w-80"
      >
        <Clerk.Field name="identifier" className="mb-6 w-full">
          <Clerk.Label onClick={() => setOpen(true)} className="label">
            Sign in with email
          </Clerk.Label>
        </Clerk.Field>
        <Clerk.Connection name="google" className="w-full">
          <div className="connection">
            <Clerk.Icon className="size-4" />
            Sign in with Google
          </div>
        </Clerk.Connection>

        {/* if I would achieve ever apple values for apple SSO */}

        {/* <Clerk.Connection name="apple" className="w-full">
          <div className={signInStyle.connection}>
            <Clerk.Icon className="size-4" />
            Sign in with Apple
          </div>
        </Clerk.Connection> */}
      </SignIn.Step>

      <div id="clerk-captcha" />

      <Link
        href="/sign-up"
        className="text-green-600 font-semibold hover:underline p-2 mt-6"
      >
        Create account
      </Link>
    </SignIn.Root>
  );
}

export default function SignInForm() {
  const clerk = useClerk();
  const [emailFormIsOpen, setEmailFormIsOpen] = useState(false);

  if (!clerk.loaded) {
    return <LoadingAuth />;
  }

  return emailFormIsOpen ? (
    <EmailForm setOpen={setEmailFormIsOpen} />
  ) : (
    <SignInButtons setOpen={setEmailFormIsOpen} />
  );
}
