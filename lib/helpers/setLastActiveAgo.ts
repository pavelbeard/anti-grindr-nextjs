export default function setLastActiveAgo(lastActive: Date): string | null {
  const lastActiveAgo = new Date().getTime() - new Date(lastActive).getTime();

  // in minutes
  const lastActiveAgoInMinutes = Math.floor(lastActiveAgo / 1000 / 60);
  // in hours
  const lastActiveAgoInHours = Math.floor(lastActiveAgo / 1000 / 60 / 60);

  if (lastActiveAgoInMinutes < 60) {
    return `Last active ${lastActiveAgoInMinutes} minutes ago`;
  }

  if (lastActiveAgoInHours < 1) {
    return `Last active ${lastActiveAgoInHours} hour ago`;
  }

  if (lastActiveAgoInHours < 24) {
    return `Last active ${Math.floor(lastActiveAgoInHours)} hours ago`;
  }

  return "Offline";
}
