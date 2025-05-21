"use client";

import useChat from "@/lib/hooks/chat/useChat";
import ChatForm from "./form";
import ChatMessages from "./messages";
import ChatHeader from "./header";

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
    form,
    inputRef,
    lastMessageRef,
    messagesContainerRef,
  } = useChat({
    userId,
    memberId,
  });

  return (
    <div className="w-2xl absolute top-0 bottom-0 grid grid-rows-[96px_1fr_96px] border-l border-r border-zinc-700">
      <ChatHeader profileName={profileName} profileAvatar={profileAvatar} />
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
        form={form}
      />
    </div>
  );
}
