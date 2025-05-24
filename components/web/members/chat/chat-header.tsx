"use client";

import { Button } from "@/components/ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ChatHeader({ closeChat }: { closeChat: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-white text-left">Chat</h2>
      <Button
        onClick={closeChat}
        className="bg-transparent hover:bg-transparent hover:text-zinc-400"
      >
        <XMarkIcon className="size-8 text-white" />
      </Button>
    </div>
  );
}
