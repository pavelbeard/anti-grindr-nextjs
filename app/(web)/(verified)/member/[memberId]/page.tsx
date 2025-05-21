import Link from "next/link";
import * as ProfileService from "@/lib/api/user/profile/profile.service";
import * as UserService from "@/lib/api/user/user.service";
import WithoutPhoto from "@/public/without-photo.png";
import { formatStatus } from "@/lib/helpers/formatStatus";
import setLastActiveAgo from "@/lib/helpers/member/setLastActiveAgo";
import clsx from "clsx";
import Controls from "@/components/web/member/controls";

type Params = Promise<{ memberId: string }>;

export default async function MemberPage({ params }: { params: Params }) {
  const { memberId } = await params;
  const member = await UserService.getUserById(memberId);

  if (!member || !memberId) {
    return (
      <section className="min-w-[600px] flex flex-col gap-y-4 flex-1 items-center justify-start max-w-xl border-l border-r border-zinc-700 p-4">
        <p className="text-white">Member not found</p>
      </section>
    );
  }

  const profile = await ProfileService.getProfileByUserId(memberId);

  const profileBirthday = profile?.date_of_birth as Date;
  const currentYear = new Date().getFullYear();
  const birthYear = profileBirthday.getFullYear();
  const age = currentYear - birthYear;

  const lastActiveAgo = setLastActiveAgo(member.lastActive);

  const status = formatStatus({
    online: member.online,
    lastActive: member.lastActive,
  });

  const showStatistics = [
    profile?.sexRole,
    profile?.height,
    profile?.weight,
  ].some(Boolean);

  const showBio = profile?.bio && profile.bio.length > 0;

  return (
    <section className="min-w-[600px] flex flex-col gap-y-4 flex-1 items-center justify-start max-w-xl border-l border-r border-zinc-700 p-4">
      <Controls />

      <img
        className="rounded-lg"
        src={profile?.avatar ?? WithoutPhoto.src}
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
            {profile?.name && <p className="font-bold">{profile?.name}</p>}
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
            <p className="text-zinc-400 uppercase font-semibold">statistics</p>
            <div aria-label="statistics" className="flex items-center gap-x-1">
              {profile?.sexRole && (
                <p>
                  {profile.sexRole
                    .split("_")
                    .join("-")
                    .replace(/^\w/, (c) => c.toUpperCase())}{" "}
                  |
                </p>
              )}
              {profile?.height && <p>{profile.height} cm |</p>}
              {profile?.weight && <p>{profile.weight} kg</p>}
            </div>
          </>
        )}
        {showBio && (
          <>
            <p className="text-zinc-400 uppercase font-semibold">bio</p>
            <div aria-label="bio" className="p-4 bg-green-600/75 rounded-lg">
              <p>{profile?.bio}</p>
            </div>
          </>
        )}
      </summary>
      <Link
        className="action bg-green-600 hover:bg-green-500"
        href={`/member/${memberId}/chat`}
      >
        Send Message
      </Link>
    </section>
  );
}
