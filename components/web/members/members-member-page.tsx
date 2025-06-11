"use client";

import { use } from "react";
import { cn } from "@/lib/utils";
import WithoutPhoto from "@/public/without-photo.png";
import * as UserFeatures from "@/lib/features/user.features";

type ProfileInfo = ReturnType<typeof UserFeatures.getMemberProfileInfo>;

interface MemberPageProps {
  memberPromise: ProfileInfo;
}

export default function MemberPage({ memberPromise }: MemberPageProps) {
  const member = use(memberPromise);
  const {
    age,
    lastActiveAgo,
    status,
    showStatistics,
    showBio,
    name,
    avatar,
    height,
    weight,
    sexRole,
    bio,
  } = member;

  return (
    <>
      <img
        className="rounded-lg w-96 h-96 object-cover"
        src={avatar ?? WithoutPhoto.src}
        alt="profile picture"
      />

      <summary
        className="flex flex-col gap-y-2 text-white w-full"
        style={{
          marker: "none",
        }}
      >
        <div
          aria-label="name, age and status"
          className="flex flex-col gap-y-2"
        >
          <div className="flex items-center space-x-1">
            {name && <p className="font-bold">{name}</p>}
            <p>{age}</p>
          </div>
          <div className="flex items-center space-x-1">
            <div
              className={cn("size-4 rounded-full", {
                "bg-green-500": status == "online",
                "bg-gray-500": status == "offline",
                "bg-yellow-500": status == "recentlyOnline",
              })}
            />
            {status == "online" && (
              <p className="text-sm text-green-500">{status}</p>
            )}
            {status == "recentlyOnline" && (
              <p className="text-sm text-yellow-500">{lastActiveAgo}</p>
            )}
            {status == "offline" && (
              <p className="text-sm text-gray-500">{lastActiveAgo}</p>
            )}
          </div>
        </div>
        {showStatistics && (
          <>
            <p className="text-zinc-400 uppercase font-semibold">statistics</p>
            <div aria-label="statistics" className="flex items-center gap-x-1">
              {sexRole && (
                <p>
                  {sexRole
                    .split("_")
                    .join("-")
                    .replace(/^\w/, (c) => c.toUpperCase())}{" "}
                  |
                </p>
              )}
              {height && <p>{height} cm |</p>}
              {weight && <p>{weight} kg</p>}
            </div>
          </>
        )}
        {showBio && (
          <>
            <p className="text-zinc-400 uppercase font-semibold">bio</p>
            <div aria-label="bio" className="p-4 bg-green-600/75 rounded-lg">
              <p>{bio}</p>
            </div>
          </>
        )}
      </summary>
    </>
  );
}
