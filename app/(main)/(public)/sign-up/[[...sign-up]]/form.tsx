"use client";

import * as SignUp from "@clerk/elements/sign-up";
import * as Clerk from "@clerk/elements/common";
import { useClerk } from "@clerk/nextjs";
import LoadingAuth from "@/components/public/loading-auth";
import signUpStyle from "@/app/components/public/style.module.css";

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
        <Clerk.Field name="emailAddress" className={signUpStyle.field}>
          <Clerk.Label className="text-xs font-light text-[#b9c3c3f5]">
            Email
          </Clerk.Label>
          <Clerk.Input placeholder="Email" required className="outline-none" />
        </Clerk.Field>
        <Clerk.Field name="password" className={signUpStyle.field}>
          <Clerk.Label className="text-xs font-light text-[#b9c3c3f5]">
            Password
          </Clerk.Label>
          <Clerk.Input
            type="password"
            placeholder="Password"
            required
            className="outline-none"
          />
          <Clerk.FieldError className="block text-sm text-rose-400" />
        </Clerk.Field>
        <SignUp.Action className={signUpStyle.action} submit>
          Sign up
        </SignUp.Action>

        <div className="flex items-center justify-center gap-2 w-full">
          <div className="h-0.5 w-full bg-[#4f4f4ff5]"></div>
          <p
            className="cl-dividerText 🔒️ cl-internal-oqzvix"
            data-localization-key="divider-text"
          >
            or
          </p>
          <div className="h-0.5 w-full bg-[#4f4f4ff5]"></div>
        </div>

        <Clerk.Connection name="google" className="w-full">
          <div className={signUpStyle.connection}>
            <Clerk.Icon className="size-4" />
            Sign up with Google
          </div>
        </Clerk.Connection>

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
          <Clerk.Field name="code" className={signUpStyle.field}>
            <Clerk.Label className="text-xs font-light text-[#b9c3c3f5]">
              Verification Code
            </Clerk.Label>
            <Clerk.Input type="otp" required className="outline-none" />
            <Clerk.FieldError className="block text-sm text-rose-400" />
          </Clerk.Field>
          <SignUp.Action className={signUpStyle.action} submit>
            Verify
          </SignUp.Action>
        </SignUp.Strategy>
      </SignUp.Step>
    </SignUp.Root>
  );
}
