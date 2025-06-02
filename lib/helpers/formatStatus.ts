import { ONE_DAY } from "@/lib/constants";

export default function formatStatus({
  online,
  lastActive,
}: {
  online: boolean;
  lastActive: Date;
}) {
  if (online) {
    return "online";
  }

  const lastActiveDate = new Date(lastActive!);
  const diff = Date.now() - lastActiveDate.getTime();
  const ifRecentlyOnline = diff < ONE_DAY;

  if (ifRecentlyOnline) {
    return "recentlyOnline";
  }

  return "offline";
}
