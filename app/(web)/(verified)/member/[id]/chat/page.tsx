"use client";

import { Profile, User } from "@/app/generated/prisma";
import { client } from "@/lib/api/client";
import getCurrentUser from "@/lib/helpers/chat/getCurrentUser";
import getOrCreateChat from "@/lib/helpers/chat/getOrCreateChat";
import getUserProfile from "@/lib/helpers/chat/getUserProfile";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Message = {
  createdAt: string;
  userId: string;
  text: string;
  User: User & {
    Profile: Profile;
  };
};

export default function ChatPage() {
  const params = useParams();
  const memberId = params.id as string;

  // ALL THE LOGIC FOR THE CHAT NEEDS TO BE IN ANOTHER FILE
  // AND THE COMPONENTS NEED TO BE IN A COMPONENTS FOLDER

  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stopLoading, setStopLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Track how many messages we've loaded for pagination
  const [offset, setOffset] = useState(20);
  const PAGE_SIZE = 20;

  // Scroll to the bottom of the messages container
  // after a new message is added
  const scrollToBottom = () => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, 100);
  };

  // Fetch current user, profile, and chatId
  useEffect(() => {
    getCurrentUser()
      .then((currentUserId) => {
        setUserId(currentUserId);
        return currentUserId;
      })
      .then((currentUserId) => {
        if (!memberId || !currentUserId) return;

        getUserProfile(memberId).then(setProfile);

        getOrCreateChat(currentUserId, memberId).then(setChatId);
      });
  }, [memberId]);

  // Fetch initial messages when chatId is set
  useEffect(() => {
    if (!chatId) return;
    const fetchInitialMessages = async () => {
      const initialMessages = await client(
        `/api/chat/${chatId}?offset=0&limit=${PAGE_SIZE}`,
        { method: "GET" }
      );
      setMessages(initialMessages.reverse());
    };
    fetchInitialMessages();
  }, [chatId]);

  // Listen for new messages via SSE
  useEffect(() => {
    console.log('debug');
    
    if (!chatId) return;
    const eventSource = new EventSource(`/api/chat/${chatId}/stream`);
    eventSource.onmessage = (event) => {
      const newMessages: Message[] = JSON.parse(event.data);
      // Only add new messages that aren't already in the list
      setMessages((prev) => {
        if (!newMessages.length) return prev;

        const lastPrev = prev[prev.length - 1];
        const lastNew = newMessages[newMessages.length - 1];
        if (!lastPrev || lastPrev.createdAt !== lastNew.createdAt) {
          // Creating a microtask in order to scroll to the bottom
          // after the state has been updated
          scrollToBottom();

          // Only append truly new messages
          return [
            ...prev,
            ...newMessages.filter(
              (m) => !prev.some((pm) => pm.createdAt === m.createdAt)
            ),
          ];
        }
        return prev;
      });
    };
    return () => eventSource.close();
  }, [chatId]);

  // Load previous messages (pagination)
  const loadPreviousMessages = async () => {
    if (!chatId) return;
    const prevMessages = await client(
      `/api/chat/${chatId}?offset=${offset}&limit=${PAGE_SIZE}`,
      { method: "GET" }
    );
    console.log("Previous messages:", prevMessages);

    if (prevMessages.length > 0 && !stopLoading) {
      // Check if the bunch of messages is smaller than the page size
      // If it is, we stop loading more messages
      // and set the stopLoading state to true
      if (prevMessages.length < PAGE_SIZE) {
        setStopLoading(true);
      }

      // Append the new messages to the existing ones
      setMessages((prev) => [...prevMessages, ...prev]);
      setOffset(offset + prevMessages.length);
    }
  };

  // Infinite scroll: load older messages when scrolled to top
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      if (container.scrollTop === 0) {
        loadPreviousMessages();
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [chatId, offset]);

  // Send message
  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim() || !userId || !chatId) return;
    await fetch(`/api/chat/${chatId}/send`, {
      method: "POST",
      body: JSON.stringify({ userId, text }),
      headers: { "Content-Type": "application/json" },
    });
    setText("");
    inputRef.current?.focus();
    scrollToBottom();
  };

  return (
    <main className="h-screen max-w-xl mx-auto bg-black p-4">
      <h1 className="text-white p-2">{profile?.name}</h1>
      <div
        ref={messagesContainerRef}
        className="flex-grow max-h-96 overflow-y-auto mb-4 flex flex-col gap-2 p-4"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            ref={index === messages.length - 1 ? lastMessageRef : undefined}
            className={`p-2 border-b border-zinc-300 rounded-xl ${
              msg.userId === userId
                ? "bg-green-300 self-end"
                : "bg-blue-300 self-start"
            }`}
          >
            <p>{msg.text}</p>
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

      <form className="relative flex items-center gap-2" onSubmit={handleSend}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          ref={inputRef}
          className="flex-2/3 border border-zinc-300 text-white rounded-lg p-2 w-full"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className={clsx(
            "flex-1/5 text-green-500 font-semibold p-2 w-16",
            "absolute top-0 right-0 h-full",
            {
              hidden: inputRef.current?.value.length === 0,
            }
          )}
        >
          Send
        </button>
      </form>
    </main>
  );
}
