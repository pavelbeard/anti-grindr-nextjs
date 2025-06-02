import { UserProfile } from "@/lib/api/user/profile/profile.types";
import { fetcher } from "@/lib/fetchClient";
import { formatStatus } from "@/lib/helpers/formatStatus";
import clsx from "clsx";
import Link from "next/link";
import useSWR from "swr";

// CHANGED
export default function Grid() {
  const {
    error,
    isLoading,
    data: userProfiles,
  }: { error: any; isLoading: boolean; data: UserProfile[] } = useSWR(
    `/api/user/profile/members`,
    fetcher
  );

  if (!userProfiles || userProfiles.length === 0) {
    return <div>No users found nearby</div>;
  }
  if (error) return <div>Error loading user profiles</div>;
  if (isLoading) return <div className="size-32">Loading...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 bg-zinc-700 gap-0.25 px-0.25">
      {userProfiles.map((member, index) => {
        const status = formatStatus({
          online: member.online,
          lastActive: member.lastActive,
        });

        return (
          <Link
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

                  // "bg-yellow-500": member.Profile?.status == "recent_connected",
                  // },
                  "rounded-full"
                )}
              />
              <span className="flex-auto text-xs text-white font-light">
                {member.Profile?.name}
              </span>
            </section>
          </Link>
        );
      })}
    </div>
  );
}
