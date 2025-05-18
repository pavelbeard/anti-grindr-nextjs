import useGetUserProfiles from "@/lib/hooks/useGetUserProfiles";
import clsx from "clsx";

export default function Grid() {
  const { userProfiles, loading, error } = useGetUserProfiles();

  if (error) return <div>Error loading user profiles</div>;

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 bg-zinc-700 gap-[1px] p-[1px]">
      {userProfiles.map((member, index) => {
        return (
          <div
            key={index}
            style={{
              backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}/without-photo.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="flex flex-col-reverse items-center p-4 h-64 w-52"
          >
            <section className="flex items-center w-full gap-1">
              {/* <span
                className={clsx(
                  "size-3 flex-none",
                  {
                    "bg-green-500": member.Profile?.status == "online",
                    "bg-gray-500": member.Profile?.status == "offline",
                    "bg-yellow-500": member.Profile?.status == "recent_connected",
                  },
                  "rounded-full"
                )}
              /> */}
              <span className="flex-auto text-xs text-white font-light">
                {member.Profile?.id}
              </span>
            </section>
          </div>
        );
      })}
    </div>
  );
}
