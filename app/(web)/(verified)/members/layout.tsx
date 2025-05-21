import * as ProfileService from "@/lib/api/user/profile/profile.service";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import UserBar from "@/components/web/members/user-bar";
import WithoutPhoto from "@/public/without-photo.png";
import { Profile } from "@/app/generated/prisma";
import IconsSet from "@/components/web/members/Icons-set";

import "@/components/web/members/style.css";

export async function generateMetadata() {
  return {
    title: "Greender | Members Area",
    description: "Access to the members area",
  };
}

export default async function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId: clerkUserId } = (await auth()) as { userId: string };
  const profilePromise = ProfileService.getProfileByClerkId(
    clerkUserId
  ) as Promise<Profile>;
  const profile = await profilePromise;

  let avatar;

  if (profile?.avatar) {
    avatar = profile.avatar;
  } else {
    avatar = WithoutPhoto.src;
  }

  return (
    <main className="min-h-screen absolute top-0 bottom-0 left-0 right-0 grid grid-rows-[64px_1fr_96px] bg-black">
      <header className="text-center flex items-center gap-x-4 w-full bg-black h-16 p-4 border-b border-zinc-700">
        <Suspense
          fallback={
            <img
              className="size-12 rounded-full border-[1px] border-zinc-700"
              src={avatar}
              alt={`${profile?.userId}_avatar`}
            />
          }
        >
          <UserBar
            profilePromise={profilePromise}
            photoFallback={WithoutPhoto.src}
          />
        </Suspense>

        <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
      </header>
      {children}
      <footer className="w-full bg-black h-24 p-4 text-center border-t border-zinc-700">
        <IconsSet />
      </footer>
    </main>
  );
}
