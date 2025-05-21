"use client";

import { SignOutButton, UserProfile } from "@clerk/nextjs";

import "@/components/web/user/profile/style.css";
import {
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

const SignOutPage = () => {
  return (
    <div className="bg-zinc-600 hover:bg-zinc-500 text-white font-bold py-2 px-4 rounded">
      <SignOutButton />
    </div>
  );
};

const UserProfilePage = () => (
  <main className="flex flex-col items-center justify-start min-h-screen bg-black">
    <UserProfile path="/user/profile/settings" routing="path">
      <UserProfile.Page
        label="Sign Out"
        labelIcon={<ArrowRightEndOnRectangleIcon />}
        url="sign-out"
      >
        <SignOutPage />
      </UserProfile.Page>
    </UserProfile>
  </main>
);

export default UserProfilePage;
