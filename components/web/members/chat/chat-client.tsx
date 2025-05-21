"use client";

import useChat from "@/lib/hooks/chat/useChat";
import ChatForm from "./form";
import ChatMessages from "./messages";

export default function ChatClient({
  userId,
  memberId,
  profileName,
  profileAvatar,
}: {
  userId: string;
  memberId: string;
  profileName: string | null;
  profileAvatar: string;
}) {
  const {
    messages,
    sendMessage,
    text,
    setText,
    inputRef,
    lastMessageRef,
    messagesContainerRef,
  } = useChat({
    userId,
    memberId,
  });

  return (
    <div className="w-2xl flex-1 flex flex-col border-l border-r border-zinc-700">
      <section className="flex items-center gap-x-4 p-4 border-b border-zinc-700">
        <img
          className="size-8 rounded-full border border-zinc-700"
          src={profileAvatar}
          alt="profile picture"
        />
        <h1 className="text-white p-2">{profileName}</h1>
      </section>
      <ChatMessages
        messages={messages}
        userId={userId}
        lastMessageRef={lastMessageRef as React.RefObject<HTMLDivElement>}
        messagesContainerRef={
          messagesContainerRef as React.RefObject<HTMLDivElement>
        }
      />
      <ChatForm
        sendMessage={sendMessage}
        inputRef={inputRef as React.RefObject<HTMLInputElement>}
        text={text}
        setText={setText}
      />
    </div>
  );
}
