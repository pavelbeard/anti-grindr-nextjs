"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SendMessageSchema,
  SendMessageType,
} from "@/lib/api/member/chat/chat.schemas";
import { Message } from "@/lib/api/member/chat/chat.types";
import { PAGE_SIZE } from "@/lib/constants";
import { fetcher } from "@/lib/fetchClient";
import { useChatContext } from "@/lib/providers/chat-provider";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import useSWRInfinite from "swr/infinite";

function ChatModalFallback() {
  return (
    <div className="fixed bottom-0 right-12 w-96 h-96 bg-zinc-700 shadow-lg rounded-t-lg p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white">Loading...</h2>
        <Button className="bg-transparent hover:bg-transparent hover:text-zinc-400">
          <XMarkIcon className="size-8 text-white" />
        </Button>
      </div>
    </div>
  );
}

export default function ChatModal() {
  const { closeChat, isChatModalOpen, chatId, userB } = useChatContext();

  const { data, size, setSize, isValidating, error, isLoading } =
    useSWRInfinite(
      (index) =>
        `/api/chat/${chatId}?offset=${index * PAGE_SIZE}&limit=${PAGE_SIZE}`,
      fetcher
    );

  const messages: Message[] = data ? [].concat(...data.reverse()) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  useEffect(() => {
    if (!chatId) return;

    console.log("ChatId", chatId);

    const eventSource = new EventSource(`/api/chat/${chatId}/stream`);
    eventSource.onmessage = (e) => {
      const messages = JSON.parse(e.data);
      console.log("New message", messages);
      mutate(`/api/chat/${chatId}?offset=0&limit=${PAGE_SIZE}`);
    };

    eventSource.onerror = () => {
      // console.error("EventSource failed");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [chatId]);

  const [isDisabled, setIsDisabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm({
    resolver: zodResolver(SendMessageSchema),
    defaultValues: {
      text: "",
    },
  });

  useEffect(() => {
    setIsDisabled(form.watch("text").length === 0);
  }, [form.watch("text")]);

  const sendMessage = async (data: SendMessageType) => {
    await fetch(`/api/chat/${chatId}/send?userId=${userB?.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        Accept: "application/json",
      },
      body: JSON.stringify(data.text.trim()),
    });
  };

  if (isLoading) {
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
        data-userbid={userB?.id}
        className="fixed bottom-0 right-12 flex flex-col w-96 h-[400px] bg-zinc-700 shadow-lg rounded-t-lg p-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-white text-left">Chat</h2>
          <Button
            onClick={closeChat}
            className="bg-transparent hover:bg-transparent hover:text-zinc-400"
          >
            <XMarkIcon className="size-8 text-white" />
          </Button>
        </div>
        {/* MESSAGES */}
        <div className="flex flex-col items-center justify-center gap-y-4 w-full overflow-y-auto h-full">
          {isEmpty && (
            <p className="text-white">
              No messages yet. Start the conversation!
            </p>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-center gap-x-2 ${
                message.userId === userB ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`rounded-lg p-2 text-white ${
                  message.userId === userB ? "bg-blue-500" : "bg-green-500"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoadingMore && <p className="text-white">Loading more...</p>}
        </div>

        <Form {...form}>
          <form
            className="flex w-full items-center gap-x-2 p-4"
            onSubmit={form.handleSubmit(sendMessage)}
          >
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      ref={inputRef}
                      className="border z-50 border-zinc-300 text-white rounded-lg p-2 w-full"
                      placeholder="Type your message..."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              aria-invalid="false"
              disabled={isDisabled}
              type="submit"
              className={clsx(
                "flex-none bg-green-600 font-semibold hover:bg-green-500 hover:text-white",
                {
                  "opacity-50 cursor-not-allowed": isDisabled,
                }
              )}
            >
              Send
            </Button>
          </form>
        </Form>
      </div>
    );
  }

  return null;
}
