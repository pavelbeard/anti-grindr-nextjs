const FIFTEEN_MINUTES = 15 * 60 * 1000;

export type UserStatus = {
  userId: string;
  online: boolean;
  lastActive: Date | null;
};

export function formatStatus({ userId, online, lastActive }: UserStatus) {
  if (online) {
    return "online";
  }

  const lastActiveDate = new Date(lastActive!);
  const diff = Date.now() - lastActiveDate.getTime();
  const ifRecentlyOnline = diff < FIFTEEN_MINUTES;

  if (ifRecentlyOnline) {
    return "recentlyOnline";
  }

  return "offline";
}
