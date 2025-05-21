"use client";

import useChat from "@/lib/hooks/chat/useChat";
import ChatForm from "./form";
import ChatMessages from "./messages";
import ChatHeader from "./header";

export default function ChatClient({
  userAId: userAId,
  userBId: userBId,
  profileName,
  profileAvatar,
  online,
  lastActive,
}: {
  userAId: string;
  userBId: string;
  profileName: string | null;
  profileAvatar: string;
  online: boolean;
  lastActive: Date;
}) {
  const {
    error,
    loading,
    messages,
    sendMessage,
    form,
    inputRef,
    lastMessageRef,
    messagesContainerRef,
  } = useChat({
    userAId,
    userBId,
  });

  return (
    <div className="w-2xl absolute top-0 bottom-0 grid grid-rows-[96px_1fr_96px] border-l border-r border-zinc-700">
      <ChatHeader
        profileName={profileName}
        profileAvatar={profileAvatar}
        online={online}
        lastActive={lastActive}
      />
      {loading && (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-white">Loading messages...</p>
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-white">Error loading messages</p>
        </div>
      )}
      {!loading && !error && messages.length === 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-white">Start the chat 👀🌳</p>
        </div>
      )}
      {messages.length > 0 && (
        <ChatMessages
          messages={messages}
          userAId={userAId}
          lastMessageRef={lastMessageRef as React.RefObject<HTMLDivElement>}
          messagesContainerRef={
            messagesContainerRef as React.RefObject<HTMLDivElement>
          }
        />
      )}

      <ChatForm
        sendMessage={sendMessage}
        inputRef={inputRef as React.RefObject<HTMLInputElement>}
        form={form}
      />
    </div>
  );
}
