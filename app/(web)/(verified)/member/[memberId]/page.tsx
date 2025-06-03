import * as UserFeatures from "@/lib/features/user.features";
import WithoutPhoto from "@/public/without-photo.png";
import clsx from "clsx";
import Controls from "@/components/web/members/member-controls";
import ChatButton from "@/components/web/chat/chat-button";

type Params = Promise<{ memberId: string }>;

export default async function MemberPage({ params }: { params: Params }) {
  const { memberId } = await params;

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
  } = await UserFeatures.getMemberProfileInfo(memberId);

  return (
    <section className="min-w-[600px] flex flex-col gap-y-4 flex-1 items-center justify-start max-w-xl border-l border-r border-zinc-700 p-4">
      <Controls />

      <img
        className="rounded-lg"
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
      
      <ChatButton userB={memberId} />
    </section>
  );
}
