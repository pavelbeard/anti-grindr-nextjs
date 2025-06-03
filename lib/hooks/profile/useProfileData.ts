import { UserProfile } from "@/lib/data/profile/profile.types";
import formatStatus from "@/lib/helpers/formatStatus";
import setLastActiveAgo from "@/lib/helpers/setLastActiveAgo";

export default function useProfileData(user: UserProfile) {
  const userId = user?.clerkUserId;
  const profileBirthday = user?.Profile?.date_of_birth as Date;
  const currentYear = new Date()?.getFullYear();
  const birthYear = profileBirthday?.getFullYear();
  const age = currentYear - birthYear;

  const lastActiveAgo = setLastActiveAgo(user?.lastActive);

  const status = formatStatus({
    online: user?.online,
    lastActive: user?.lastActive,
  });

  const showStatistics = [
    user?.Profile?.sexRole,
    user?.Profile?.height,
    user?.Profile?.weight,
  ].some(Boolean);

  const showBio = user?.Profile?.bio && user.Profile.bio.length > 0;

  const name = user?.Profile?.name;
  const avatar = user?.Profile?.avatar;

  const height = user?.Profile?.height;
  const weight = user?.Profile?.weight;
  const sexRole = user?.Profile?.sexRole;
  const bio = user?.Profile?.bio;

  return {
    userId,
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
  };
}
