"use client";

import { client } from "@/lib/api/client";
import { useEffect } from "react";

export default function UserStatus() {
  const goOnline = async () => {
    await client("/api/user/status", {
      method: "POST",
      body: JSON.stringify({
        status: "online",
      }),
    });
  };

  const goOffline = async () => {
    navigator.sendBeacon(
      "/api/user/status",
      JSON.stringify({ status: "offline", lastSeen: Date.now() })
    );
  };

  useEffect(() => {
    goOnline();

    window.addEventListener("beforeunload", goOffline);

    return () => {
      goOffline();
      window.removeEventListener("beforeunload", goOffline);
    };
  }, []);

  return null;
}
