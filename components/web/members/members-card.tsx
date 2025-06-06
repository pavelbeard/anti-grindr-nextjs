import { cn } from "@/lib/utils";;
import { UserProfile } from "@/lib/data/profile/profile.types";
import Link from "next/link";

interface MembersCardProps {
  member: UserProfile;
  status: "online" | "offline" | "recentlyOnline";
}
export default function MembersCard({ member, status }: MembersCardProps) {
  return (
    <Link
      href={`/members/${member.clerkUserId}`}
      className="flex flex-col-reverse items-center p-4 h-64 w-52"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}/without-photo.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      role="button"
      aria-label={`View details for ${member.Profile?.name}`}
    >
      <section className="flex items-center w-full gap-1">
        <span
          className={cn(
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
    </Link>
  );
}
