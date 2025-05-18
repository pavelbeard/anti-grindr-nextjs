import { Profile, User } from "@/app/generated/prisma";
import { useCallback, useEffect, useState } from "react";
import { client } from "./client";

type UserProfile = {
  id: User["id"];
  Profile: Profile;
};

export default function useGetUserProfiles() {
  // This is a placeholder for the actual implementation of the hook.
  // You would typically use a state management library or context to manage the user profiles.
  // For example, you could use React's useState and useEffect hooks to fetch and store user profiles.
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      const data = await client("/api/user-profile", { method: "GET" });
      setUserProfiles(data);
    } catch (error: any) {
      console.error("Error fetching user profiles:", error);
      setUserProfiles([]);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    userProfiles,
    loading,
    error,
  };
}
