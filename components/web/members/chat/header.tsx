"use client";

import { formatStatus } from "@/lib/helpers/formatStatus";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function ChatHeader({
  profileName,
  profileAvatar,
  online,
  lastActive,
}: {
  profileName: string | null;
  profileAvatar: string;
  online: boolean;
  lastActive: Date;
}) {
  const status = formatStatus({ online, lastActive });
  const router = useRouter();

  return (
    <section className="bg-black flex items-center gap-x-4 p-4 border-b border-zinc-700">
      <ArrowLeftIcon className="size-6 text-white cursor-grab" onClick={() => router.back()} />
      <img
        className="size-14 rounded-full border border-zinc-700"
        src={profileAvatar}
        alt="profile picture"
      />
      <span
        className={clsx("size-4 rounded-full", {
          "bg-green-500": status === "online",
          "bg-gray-500": status === "offline",
          "bg-yellow-500": status === "recentlyOnline",
        })}
      ></span>
      <h1 className="text-white p-2">{profileName}</h1>
    </section>
  );
}
