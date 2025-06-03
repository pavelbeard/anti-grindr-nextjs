"use client";

import { Button } from "@/components/ui/button";
import { useChatContext } from "@/lib/providers/chat-provider";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ChatForm from "./chat-form";
import ChatMessages from "./chat-messages";
import ChatHeader from "./chat-header";

function ChatModalFallback() {
  const { closeChat } = useChatContext();

  return (
    <div className="fixed bottom-0 right-12 w-96 h-96 bg-zinc-700 shadow-lg rounded-t-lg p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white">Loading...</h2>
        <Button
          onClick={closeChat}
          className="bg-transparent hover:bg-transparent hover:text-zinc-400"
        >
          <XMarkIcon className="size-8 text-white" />
        </Button>
      </div>
    </div>
  );
}

export default function ChatModal() {
  const {
    error,
    isLoading,
    closeChat,
    isChatModalOpen,
    chatId,
    userB,
    messages,
  } = useChatContext();

  const isEmpty = messages.length === 0;

  if (isLoading && isChatModalOpen) {
    return <ChatModalFallback />;
  }

  if (isChatModalOpen) {
    return (
      <div
        // ref={chatContainerRef}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isChatModalOpen}
        aria-label="Chat window"
        data-chatid={chatId}
        data-userbid={userB}
        className="fixed bottom-0 right-12 flex flex-col w-96 h-[400px] bg-zinc-700 shadow-lg rounded-t-lg p-4"
      >
        {/* HEADER */}
        <ChatHeader closeChat={closeChat} />
        {/* MESSAGES */}
        <ChatMessages messages={messages} userB={userB} isEmpty={isEmpty} />
        {/* CHAT FORM */}
        <ChatForm chatId={chatId} userB={userB} />
      </div>
    );
  }

  return null;
}
