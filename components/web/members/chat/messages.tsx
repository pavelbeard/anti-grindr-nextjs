import type { Message } from "@/lib/api/member/chat/chat.types";

export default function ChatMessages({
  messages,
  userAId,
  lastMessageRef,
  messagesContainerRef,
}: {
  messages: Message[];
  userAId: string;
  lastMessageRef: React.RefObject<HTMLDivElement>;
  messagesContainerRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      aria-label="messages"
      ref={messagesContainerRef}
      className="overflow-y-auto mb-4 flex flex-col gap-2 p-4"
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          ref={index === messages.length - 1 ? lastMessageRef : undefined}
          className={`p-2 border-b border-zinc-300 rounded-xl ${
            msg.userId === userAId
              ? "bg-green-300 self-end"
              : "bg-blue-300 self-start"
          }`}
        >
          <p className="text-black">{msg.text}</p>
          <small className="text-xs text-zinc-500">
            {new Date(msg.createdAt)
              .toLocaleTimeString()
              .split(":")
              .slice(0, 2)
              .join(":")}
          </small>
        </div>
      ))}
    </div>
  );
}
