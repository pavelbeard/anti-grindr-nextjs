const FIFTEEN_MINUTES = 15 * 60 * 1000;

export type UserStatus = {
  online: boolean;
  lastActive: Date | null;
};

export function formatStatus({ online, lastActive }: UserStatus) {
  if (online) {
    return "online";
  }

  console.log("lastActive", lastActive);

  const lastActiveDate = new Date(lastActive!);
  const diff = Date.now() - lastActiveDate.getTime();
  const ifRecentlyOnline = diff < FIFTEEN_MINUTES;

  if (ifRecentlyOnline) {
    return "recentlyOnline";
  }

  return "offline";
}
