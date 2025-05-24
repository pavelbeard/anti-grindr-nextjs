"use client";
import { client } from "@/lib/fetchClient";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

// CHANGED
export default function UserStatusClient() {
  const { userId } = useAuth();

  const goOnline = async () => {
    await client(`/api/user/status`, {
      method: "POST",
      body: JSON.stringify({
        status: "online",
      }),
    });
  };

  const goOffline = async () => {
    console.log("Sending offline status");

    navigator.sendBeacon(
      `/api/user/status`,
      JSON.stringify({ status: "offline" })
    );
  };

  useEffect(() => {
    if (!userId) return;
    // Set the user status to online when the component mounts
    // and when the userId changes
    goOnline();

    window.addEventListener("beforeunload", goOffline);

    return () => {
      goOffline();
      window.removeEventListener("beforeunload", goOffline);
    };
  }, [userId]);

  return null;
}
