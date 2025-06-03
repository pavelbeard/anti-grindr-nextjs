"use client";

import clsx from "clsx";

import WithoutPhoto from "@/public/without-photo.png";
import Controls from "./member-controls";
import ChatButton from "../chat/chat-button";
import { createPortal } from "react-dom";
import useProfileData from "@/lib/hooks/profile/useProfileData";
import { UserProfile } from "@/lib/data/profile/profile.types";

interface MembersModalProps {
  user: UserProfile;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

/*
 * MembersModal component for displaying a modal with member details.
 * This component is designed to be used in a web application, likely as part of a user interface for managing or viewing members.
 * It utilizes React's Suspense for loading states and is structured to handle member data efficiently.
 */
export default function MembersModal({
  user,
  isOpen,
  setIsOpen,
}: MembersModalProps) {
  const {
    userId: memberId,
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
  } = useProfileData(user);

  return (
    isOpen &&
    createPortal(
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        aria-label="Member details modal"
        onClick={() => setIsOpen(false)}
      >
        <section
          className="z-100 min-w-[400px] flex flex-col gap-y-4 flex-1 items-center justify-start max-w-xl border rounded-lg bg-black border-zinc-700 p-4"
          onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        >
          <Controls closeModal={() => setIsOpen(false)} />

          <img
            className="rounded-lg w-96 h-96 object-cover mb-4"
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
                  className={clsx("size-4 rounded-full", {
                    "bg-green-500": status == "online",
                    "bg-gray-500": status == "offline",
                    "bg-yellow-500": status == "recentlyOnline",
                  })}
                ></div>
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
                <p className="text-zinc-400 uppercase font-semibold">
                  statistics
                </p>
                <div
                  aria-label="statistics"
                  className="flex items-center gap-x-1"
                >
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
                <div
                  aria-label="bio"
                  className="p-4 bg-green-600/75 rounded-lg"
                >
                  <p>{bio}</p>
                </div>
              </>
            )}
          </summary>

          <ChatButton userB={memberId} />
        </section>
      </div>,
      document.body
    )
  );
}
