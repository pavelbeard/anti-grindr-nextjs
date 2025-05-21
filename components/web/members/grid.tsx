import { formatStatus } from "@/lib/helpers/formatStatus";
import useGetMembers from "@/lib/hooks/members/tabs/useGetMembers";
import clsx from "clsx";
import Link from "next/link";

export default function Grid({ userId }: { userId: string }) {
  const { error, loading, userProfiles } = useGetMembers(userId);

  if (!userProfiles || userProfiles.length === 0) {
    return <div>No users found nearby</div>;
  }
  if (error) return <div>Error loading user profiles</div>;
  if (loading) return <div className="size-32">Loading...</div>;

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
