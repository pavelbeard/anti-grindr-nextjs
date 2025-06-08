import { Button } from "@/components/ui/button";
import { useChatContainerContext } from "@/lib/providers/chat-container-context";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import React from "react";

export default function ChatMessages() {
  const { user } = useUser();
  const {
    allMessages,
    expanded,
    messagesContainerRef,
    IsBtnScrollToBottomVisible,
    disableScrollToBottom,
    newMessagesCount,
  } = useChatContainerContext();

  if (!expanded) return null;

  if (!allMessages || allMessages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <span className="text-gray-500">No messages yet.</span>
      </div>
    );
  }

  return (
    <div
      className="flex-1 overflow-y-auto p-4 flex flex-col gap-y-2 relative"
      ref={messagesContainerRef}
    >
      {allMessages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "flex flex-col",
            message.userId === user?.id ? "items-start" : "items-end"
          )}
        >
          <span
            className={cn(
              "font-semibold px-4 py-2 ",
              message.userId === user?.id
                ? "bg-blue-500 rounded-t-lg rounded-br-lg"
                : "bg-green-500 rounded-t-lg rounded-bl-lg"
            )}
          >
            {message.text}
          </span>
          <span className="text-xs text-gray-500">
            {/* INTERNALIZATION WILL COME SOON */}
            {new Date(message.createdAt).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      ))}
      {IsBtnScrollToBottomVisible && (
          <div className="fixed bottom-20 z-10 self-center">
            <Button
              className=" bg-green-500 hover:bg-green-600 transition-colors"
              onClick={disableScrollToBottom}
            >
              New messages ({newMessagesCount})
            </Button>
          </div>
        )}
    </div>
  );
}
