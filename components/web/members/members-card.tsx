import clsx from "clsx";
import MembersModal from "./members-modal";
import { useState } from "react";
import { UserProfile } from "@/lib/data/profile/profile.types";

interface MembersCardProps {
  member: UserProfile;
  status: "online" | "offline" | "recentlyOnline";
}
export default function MembersCard({ member, status }: MembersCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className="flex flex-col-reverse items-center p-4 h-64 w-52"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}/without-photo.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={() => setIsOpen(true)}
        role="button"
        aria-label={`View details for ${member.Profile?.name}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
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
      </div>
      <MembersModal user={member} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
