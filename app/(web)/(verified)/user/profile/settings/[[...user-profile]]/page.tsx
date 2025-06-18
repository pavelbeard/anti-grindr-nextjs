"use client";

import { cn } from "@/lib/utils";
import { UserProfile } from "@clerk/nextjs";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const UserProfilePage = () => (
  <>
    <style jsx global>
      {`
        .cl-navbarButton__custom-page-0 {
          background: linear-gradient(
            180deg,
            #00a63e 0%,
            #00a63e 100%
          ) !important;
          color: white !important;
          opacity: 1;
          margin-top: 0.5rem !important;

          &:hover {
            background: linear-gradient(
              180deg,
              #05df72 0%,
              #00c950 100%
            ) !important;
          }
        }
      `}
    </style>
    <main
      className={cn(
        "flex flex-col items-center justify-start min-h-screen bg-black text-green-"
      )}
    >
      <UserProfile
        path="/user/profile/settings"
        routing="path"
        appearance={{
          elements: {
            navbarMobileMenuRow:
              "bg-[linear-gradient(180deg,_#1e1e2f_0%,_#1e1e2f_100%)]! text-white! rounded-lg!",
            cardBox: "h-screen! rounded-none!",
            scrollBox: "rounded-none!",
            pageScrollBox: "bg-zinc-800! text-white!",
            headerTitle: "text-white! text-2xl! font-semibold!",
            profileSection: "border-t! border-zinc-700!",
            profileSectionTitleText: "text-white! font-semibold!",
            profileSectionItem: "**:text-white!",
            badge: "bg-zinc-600! text-white! rounded-lg!",
            navbar:
              "bg-[linear-gradient(180deg,_#1e1e2f_0%,_#1e1e2f_100%)]! **:data-localization-key:text-white!",
            navbarButtons: "gap-y-2!",
            navbarButton: "bg-zinc-600! hover:bg-zinc-500! rounded-lg!",
            navbarButtonText: "text-white!",
            navbarButtonIcon: "text-white!",
            actionCard: "bg-zinc-700! rounded-lg!",
            button:
              "text-white! bg-zinc-600! data-[color=danger]:bg-red-600! hover:bg-zinc-500! data-[color='danger']:hover:bg-red-500! data-[color=danger]:rounded-md! rounded-lg!",
            menuButton: "focus:ring-2! focus:ring-zinc-500!",
            menuList: "bg-zinc-700! rounded-lg!",
            menuItem:
              "text-white! bg-zinc-600! data-[color=danger]:bg-red-600! hover:bg-zinc-500! data-[color='danger']:hover:bg-red-500! data-[color=danger]:rounded-md! rounded-lg!",
            providerIcon__apple: "text-white!",
            formFieldLabel: "text-white! font-semibold!",
            formFieldRadioLabel: "text-white! font-semibold!",
            formFieldInput:
              "bg-zinc-500! text-white! rounded-lg! placeholder:text-zinc-300!",
            formFieldInputShowPasswordButton:
              "bg-zinc-700! hover:bg-zinc-600! rounded-lg!",
            formFieldErrorText: "text-red-500! font-semibold!",
            footer:
              "bg-linear-gradient(180deg,_#1e1e2f_0%,_#1e1e2f_100%)! text-white! rounded-lg!",
          },
        }}
      >
        <UserProfile.Link
          label="Back to Members"
          labelIcon={<ArrowLeftIcon className="size-4 text-white" />}
          url="/members"
        />
      </UserProfile>
    </main>
  </>
);

export default UserProfilePage;
