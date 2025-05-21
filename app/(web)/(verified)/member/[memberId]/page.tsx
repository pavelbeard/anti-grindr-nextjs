import Link from "next/link";
import * as ProfileService from "@/lib/api/user/profile/profile.service";
import WithoutPhoto from "@/public/without-photo.png";

type Params = Promise<{ memberId: string }>;

export default async function MemberPage({ params }: { params: Params }) {
  const { memberId } = await params;
  const profile = await ProfileService.getProfileByUserId(memberId);

  const profileBirthday = profile?.date_of_birth as Date;
  const currentYear = new Date().getFullYear();
  const birthYear = profileBirthday.getFullYear();
  const age = currentYear - birthYear;

  return (
    <section className="flex flex-col gap-y-4 flex-1 items-center justify-start max-w-xl border-l border-r border-zinc-700 p-4">
      <img src={profile?.avatar ?? WithoutPhoto.src} alt="profile picture" />
      <Link
        className="action bg-green-600 hover:bg-green-500"
        href={`/member/${memberId}/chat`}
      >
        Send Message
      </Link>
      <summary>
        <p>{age}</p>
        <p>{profile?.bio}</p>
      </summary>
    </section>
  );
}
