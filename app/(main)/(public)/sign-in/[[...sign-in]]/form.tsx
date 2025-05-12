"use client";

import * as SignIn from "@clerk/elements/sign-in";
import * as Clerk from "@clerk/elements/common";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import signInStyle from "@/app/components/public/style.module.css";

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
          <ArrowLeftIcon className="size-6 text-[#ffffff]" />
        </button>
        <Link
          href="/sign-up"
          className="text-[#4A9D5B] font-semibold hover:underline"
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
          <Clerk.Field name="identifier" className={signInStyle.field}>
            <Clerk.Label className="text-xs font-light text-[#b9c3c3f5]">
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
              className="outline-none"
            />
            <Clerk.FieldError className="block text-sm text-rose-400" />
          </Clerk.Field>
          <Clerk.Field name="password" className={signInStyle.field}>
            <Clerk.Label className="text-xs font-light text-[#b9c3c3f5]">
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
              className="outline-none"
            />
            <Clerk.FieldError className="block text-sm text-rose-400" />
          </Clerk.Field>
          <SignIn.Action
            disabled={!signInEnabled}
            className={signInStyle.action}
            submit
          >
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
          <Clerk.Label
            onClick={() => setOpen(true)}
            className={signInStyle.label}
          >
            Sign in with email
          </Clerk.Label>
        </Clerk.Field>
        <Clerk.Connection name="google" className="w-full">
          <div className={signInStyle.connection}>
            <Clerk.Icon className="size-4" />
            Sign in with Google
          </div>
        </Clerk.Connection>
        <Clerk.Connection name="apple" className="w-full">
          <div className={signInStyle.connection}>
            <Clerk.Icon className="size-4" />
            Sign in with Apple
          </div>
        </Clerk.Connection>
      </SignIn.Step>
      <Link
        href="/sign-up"
        className="text-[#4A9D5B] font-semibold hover:underline p-2 mt-6"
      >
        Create account
      </Link>
    </SignIn.Root>
  );
}

export default function SignInForm() {
  const [emailFormIsOpen, setEmailFormIsOpen] = useState(false);

  return emailFormIsOpen ? (
    <EmailForm setOpen={setEmailFormIsOpen} />
  ) : (
    <SignInButtons setOpen={setEmailFormIsOpen} />
  );
}
