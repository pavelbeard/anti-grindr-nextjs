import { UserProfile } from "@/lib/api/user/profile/profile.types";
import { client } from "@/lib/fetchClient";
import { useCallback, useEffect, useState } from "react";

export default function useGetMembers(userId: string) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await client(`/api/user/${userId}/profile/members`, {
        method: "GET",
      });
      setUserProfiles(data);
    } catch (error: any) {
      console.error("Error fetching user profiles:", error);
      setError(error);
      setUserProfiles([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    userProfiles,
    loading,
    error,
  };
}
