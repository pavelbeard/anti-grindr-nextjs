"use client";

import { EVENT_MESSAGE_TYPE } from "@/lib/constants";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function Page() {
  const [channel, setChannel] = useState<ReturnType<
    typeof supabase.channel
  > | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const handleMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const messageInput = event.currentTarget.elements.namedItem(
      "message"
    ) as HTMLInputElement;
    const message = messageInput.value;

    if (!channel || !isConnected) {
      console.warn("Channel is not connected.");
      return;
    }

    setMessages((prevMessages) => [...prevMessages, message]);

    await channel.send({
      type: "broadcast",
      event: EVENT_MESSAGE_TYPE,
      payload: { message },
    });
  };

  useEffect(() => {
    const channelTest = supabase.channel("test-broadcast");

    channelTest
      .on("broadcast", { event: EVENT_MESSAGE_TYPE }, (payload) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          payload.payload.message as string,
        ]);
      })
      .subscribe((status) => {
        console.log("Channel subscription status:", status);
        if (status === "SUBSCRIBED") {
          setIsConnected(true);
        }
      });

    setChannel(channelTest);

    return () => {
      supabase.removeChannel(channelTest);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Test Broadcast Page</h1>
      <form onSubmit={handleMessage} className="space-y-4">
        <h1 className="text-2xl font-bold mb-4">Test Broadcast Form</h1>
        <p className="mb-4">
          This page is for testing the broadcast functionality.
        </p>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message:
          </label>
          <input
            type="text"
            id="message"
            name="message"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Send Broadcast
        </button>
      </form>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Broadcast Messages</h2>
        <ul className="list-disc pl-5">
          {/* {new Array(5)
            .fill(
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quia optio corrupti beatae nulla laborum reiciendis voluptatibus impedit consequatur temporibus sequi ipsa eveniet, hic modi, autem dolore assumenda qui odio!"
            )
            .map((lorem, index) => (
              <li key={index} className="mb-2">
                Broadcast message {index + 1}: {lorem}
              </li>
            ))} */}
          {messages.map((message, index) => (
            <li key={index} className="mb-2">
              {message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
