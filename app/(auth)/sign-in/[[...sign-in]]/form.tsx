"use client";

import * as SignIn from "@clerk/elements/sign-in";
import * as Clerk from "@clerk/elements/common";
import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import LoadingAuth from "@/components/auth/loading-auth";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function SignInForm() {
  const clerk = useClerk();
  const pathname = usePathname();

  // this is a workaround for email step
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);
  const isVerificationStep = pathname.includes("continue");

  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const [isSignInEnabled, setIsSignInEnabled] = useState(false);

  // this is a workaround for OTP step
  const [emailCode, setEmailCode] = useState("");
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);

  // this is a workaround for reset password strategy
  const [resetPasswordData, setResetPasswordData] = useState({
    password: "",
    passwordConfirm: "",
  });
  const [isResetPasswordEnabled, setIsResetPasswordEnabled] = useState(false);

  useEffect(() => {
    setIsSignInEnabled(
      Object.values(credentials).every((value) => value.length > 0)
    );
  }, [credentials]);

  useEffect(() => {
    setIsContinueEnabled(emailCode.length > 0);
  }, [emailCode]);

  useEffect(() => {
    setIsResetPasswordEnabled(
      Object.values(resetPasswordData).every((value) => value.length > 0)
    );
  }, [resetPasswordData]);

  if (!clerk.loaded) {
    return <LoadingAuth />;
  }

  return (
    <SignIn.Root>
      <SignIn.Step
        name="start"
        className="flex flex-col gap-4 items-center w-80"
      >
        {!isEmailFormOpen && (
          <>
            <Clerk.Field name="identifier" className="mb-6 w-full">
              <Clerk.Label
                onClick={() => setIsEmailFormOpen(true)}
                className="label"
              >
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

            <Link
              href="/sign-up"
              className="text-green-600 font-semibold hover:underline p-2 mt-6"
            >
              Create account
            </Link>
          </>
        )}
      </SignIn.Step>

      <div id="clerk-captcha" />

      {(isEmailFormOpen || isVerificationStep) && (
        <>
          {!isVerificationStep && (
            <div className="flex items-center justify-between w-full">
              <Button
                onClick={() => setIsEmailFormOpen(false)}
                className="bg-transparent hover:bg-white/10 p-2 rounded-full"
              >
                <ArrowLeftIcon className="size-6 text-white" />
              </Button>
              <Link
                href="/sign-up"
                className="text-green-600 font-semibold hover:underline"
              >
                Create account
              </Link>
            </div>
          )}

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
          </SignIn.Step>

          <SignIn.Step
            className="flex flex-col gap-4 items-center w-80"
            name="verifications"
          >
            <SignIn.Strategy name="email_code">
              <div className="flex flex-col items-center justify-center text-white gap-y-2">
                <h1>Check your email</h1>
                <p className="text-sm text-[var(--small-text-color)]">
                  We sent a code to <SignIn.SafeIdentifier />.
                </p>
              </div>

              <Clerk.Field className="field" name="code">
                <Clerk.Label className=" text-xs font-light text-[var(--label-color)]">
                  Email code
                </Clerk.Label>
                <Clerk.Input
                  onChange={(e) => setEmailCode(e.target.value)}
                  required
                  placeholder="OTP code from email"
                  className="outline-none placeholder:text-[var(--placeholder-color)]"
                />
                <Clerk.FieldError className="block text-sm text-rose-400" />
              </Clerk.Field>

              <SignIn.Action
                disabled={!isContinueEnabled}
                className="action"
                submit
              >
                Continue
              </SignIn.Action>
            </SignIn.Strategy>

            <SignIn.Strategy name="password">
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

              <SignIn.Action
                disabled={!isSignInEnabled}
                className="action"
                submit
              >
                Sign in
              </SignIn.Action>
              <SignIn.Action
                className="text-sm text-gray-400"
                navigate="forgot-password"
              >
                Forgot password?
              </SignIn.Action>
            </SignIn.Strategy>

            <SignIn.Strategy name="reset_password_email_code">
              <div className="flex flex-col items-center justify-center text-white gap-y-2">
                <h1>Check your email</h1>
                <p className="text-center text-sm text-[var(--small-text-color)]">
                  We sent a code to <SignIn.SafeIdentifier />.
                </p>
              </div>

              <Clerk.Field name="code" className="field">
                <Clerk.Label className="text-xs font-light text-[var(--label-color)]">
                  Email code
                </Clerk.Label>
                <Clerk.Input />
                <Clerk.FieldError />
              </Clerk.Field>

              <SignIn.Action className="action" submit>
                Continue
              </SignIn.Action>
            </SignIn.Strategy>
          </SignIn.Step>

          <SignIn.Step
            className="flex flex-col gap-y-4 items-center w-80 text-white"
            name="forgot-password"
          >
            <div className="flex items-center justify-start w-full">
              <SignIn.Action
                className="bg-transparent hover:bg-white/10 p-2 rounded-full"
                navigate="previous"
              >
                <ArrowLeftIcon className="size-6 text-white" />
              </SignIn.Action>
            </div>
            <h1>Forgot your password?</h1>

            <SignIn.SupportedStrategy name="reset_password_email_code">
              <p className="font-semibold hover:underline">Reset password</p>
            </SignIn.SupportedStrategy>
          </SignIn.Step>
        </>
      )}

      <SignIn.Step
        className="flex flex-col gap-4 items-center w-80"
        name="reset-password"
      >
        <h1 className="text-white">Reset password</h1>

        <Clerk.Field name="password" className="field">
          <Clerk.Label className="text-xs font-light text-[var(--label-color)]">
            New password
          </Clerk.Label>

          <Clerk.Input
            type="password"
            required
            placeholder="New password"
            onChange={(e) =>
              setResetPasswordData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            className="outline-none placeholder:text-[var(--placeholder-color)]"
          />
          <Clerk.FieldError className="block text-sm text-rose-400" />
        </Clerk.Field>
        <Clerk.Field name="passwordConfirm" className="field">
          <Clerk.Label className="text-xs font-light text-[var(--label-color)]">
            Confirm password
          </Clerk.Label>

          <Clerk.Input
            type="password"
            required
            placeholder="Confirm password"
            onChange={(e) =>
              setResetPasswordData((prev) => ({
                ...prev,
                passwordConfirm: e.target.value,
              }))
            }
            className="outline-none placeholder:text-[var(--placeholder-color)]"
          />
          <Clerk.FieldError className="block text-sm text-rose-400" />
        </Clerk.Field>

        <SignIn.Action
          disabled={!isResetPasswordEnabled}
          className="action"
          submit
        >
          Reset password
        </SignIn.Action>
      </SignIn.Step>
    </SignIn.Root>
  );
}
