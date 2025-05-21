const ONE_DAY = 24 * 60 * 60 * 1000;

export type UserStatus = {
  online: boolean;
  lastActive: Date;
};

export function formatStatus({ online, lastActive }: UserStatus) {
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
