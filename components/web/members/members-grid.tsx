"use client";

import { UserProfile } from "@/lib/data/profile/profile.types";
import formatStatus from "@/lib/helpers/formatStatus";
import clsx from "clsx";
import Link from "next/link";
import { Fragment } from "react";
import { use, useState } from "react";
import MembersModal from "./members-modal";
import MembersCard from "./members-card";

// CHANGED
export default function Grid({
  membersPromise,
}: {
  membersPromise: Promise<UserProfile[]>;
}) {
  const members = use(membersPromise) as UserProfile[];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 bg-zinc-700 gap-0.25 px-0.25">
      {members.map((member, index) => {
        const status = formatStatus({
          online: member.online,
          lastActive: member.lastActive,
        });

        return (
          <Fragment key={index}>
            <MembersCard member={member} status={status} />
            {/* <Link
              href={`/member/${member.Profile?.userId}`}
              key={index}
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}/without-photo.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="flex flex-col-reverse items-center p-4 h-64 w-52"
            >
              <section className="flex items-center w-full gap-1">
                <span
                  className={clsx(
                    "size-3 flex-none",
                    member.online
                      ? "bg-green-500"
                      : {
                          "bg-gray-500": status === "offline",
                          "bg-yellow-500": status === "recentlyOnline",
                        },
                    "rounded-full"
                  )}
                />
                <span className="flex-auto text-xs text-white font-light">
                  {member.Profile?.name}
                </span>
              </section>
            </Link> */}
          </Fragment>
        );
      })}
    </div>
  );
}
