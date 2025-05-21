export default function ChatHeader({
  profileName,
  profileAvatar,
}: {
  profileName: string | null;
  profileAvatar: string;
}) {
  return (
    <section className="bg-black flex items-center gap-x-4 p-4 border-b border-zinc-700">
      <img
        className="size-8 rounded-full border border-zinc-700"
        src={profileAvatar}
        alt="profile picture"
      />
      <h1 className="text-white p-2">{profileName}</h1>
    </section>
  );
}
