"use client";

import { createContext, useContext } from "react";
import useIncomingMessagesListener from "../hooks/chat/useIncomingMessagesListener";
import { Channel } from "@/types/chat.types";

interface IPresenceContext {
  incomingMessagesChannel: Channel | null;
}

export const PresenceContext = createContext<IPresenceContext | null>(null);

export default function PresenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected, channel } = useIncomingMessagesListener();

  return (
    <PresenceContext.Provider
      value={{
        incomingMessagesChannel: channel,
      }}
    >
      {children}
    </PresenceContext.Provider>
  );
}

export const usePresenceContext = () => {
  const context = useContext(PresenceContext);
  if (!context) {
    throw new Error(
      "usePresenceContext must be used within a PresenceProvider"
    );
  }
  return context;
};
