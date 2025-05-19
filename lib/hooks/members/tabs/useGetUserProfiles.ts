import { client } from "@/lib/api/client";
import { UserProfile } from "@/lib/api/userProfile/types";
import { useCallback, useEffect, useState } from "react";

export default function useGetUserProfiles() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await client("/api/user/profile", { method: "GET" });
      setUserProfiles(data);
    } catch (error: any) {
      console.error("Error fetching user profiles:", error);
      setError(error);
      setUserProfiles([]);
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
