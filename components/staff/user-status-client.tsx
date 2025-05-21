"use client";
import { client } from "@/lib/fetchClient";
import { useEffect } from "react";

export default function UserStatusClient({ userId }: { userId: string }) {
  const goOnline = async () => {
    await client(`/api/user/${userId}/status`, {
      method: "PATCH",
      body: JSON.stringify({
        status: "online",
      }),
    });
  };

  const goOffline = async () => {
    console.log("Sending offline status");

    navigator.sendBeacon(
      `/api/user/${userId}/status`,
      JSON.stringify({ status: "offline", lastSeen: Date.now() })
    );
  };

  useEffect(() => {
    if (!userId) return;

    goOnline();

    window.addEventListener("beforeunload", goOffline);

    return () => {
      goOffline();
      window.removeEventListener("beforeunload", goOffline);
    };
  }, []);

  return null;
}
