"use client";

import { Profile } from "@/app/generated/prisma";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useChangeName from "@/lib/hooks/user/profile/useChangeName";
import { Cog8ToothIcon, PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { use, useState } from "react";
import { createPortal } from "react-dom";

export default function UserBar({
  profilePromise,
  photoFallback,
}: {
  profilePromise: Promise<Profile>;
  photoFallback: string;
}) {
  const profile = use(profilePromise);
  const [isUserbarOpen, setIsUserbarOpen] = useState(false);

  const { inputRef, name, form, onSubmit } = useChangeName(profile.userId);

  return (
    <>
      <img
        onClick={() => setIsUserbarOpen((prev) => !prev)}
        className="size-12 rounded-full border-[1px] border-zinc-700 cursor-pointer"
        src={profile?.avatar || photoFallback}
        alt={`${profile?.userId}_avatar`}
      />
      {isUserbarOpen &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-100 text-white flex">
            <div className="flex flex-col gap-y-8 h-full w-96 bg-zinc-800 p-4">
              <section
                aria-label="member pic and name"
                className="flex flex-col items-center gap-y-4"
              >
                <img
                  className="size-32 rounded-full border-[1px] border-zinc-700"
                  src={profile?.avatar || photoFallback}
                  alt={`${profile?.userId}_avatar`}
                />
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-4 w-full"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="relative flex items-center gap-x-2">
                          <FormControl>
                            <Input
                              className="rounded-full border border-zinc-700 bg-zinc-600"
                              {...field}
                              ref={inputRef}
                              value={name}
                              placeholder="Member name"
                            />
                          </FormControl>
                          <span className="absolute right-0 top-0 bottom-0 flex p-2 items-center justify-center">
                            <PencilIcon className="size-4 text-zinc-400" />
                          </span>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </section>
              <section aria-label="buttons" className="flex flex-col gap-y-4">
                <Link
                  className="user-bar-btns"
                  href="/user/profile/settings"
                >
                  <Cog8ToothIcon className="size-5 text-zinc-400" /> Go to Profile Settings
                </Link>
              </section>
            </div>
            <div
              aria-label="Background"
              className="flex-2/3 w-full h-full"
              onClick={() => setIsUserbarOpen(false)}
            />
          </div>,
          document.body
        )}
    </>
  );
}
