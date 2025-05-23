import { useEffect } from "react";
import useSWR, { mutate } from "swr";

const fetchPrivateChat = async ([url, userA, userB]: [
  string,
  string,
  string,
]) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch chat");
  }

  return response.json();
};

const createPrivateChat = async ({
  userA,
  userB,
}: {
  userA: string;
  userB: string;
}) => {
  const response = await fetch(
    `/api/chat/between?userA=${userA}&userB=${userB}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create chat");
  }

  return response.json();
};

export default function useChatId({
  userA,
  userB,
}: {
  userA: string;
  userB: string;
}) {
  const { data, error, isLoading } = useSWR(
    ["/api/chat/between", userA, userB],
    fetchPrivateChat
  );

  useEffect(() => {
    if (error?.message === "Not found") {
      createPrivateChat({ userA, userB })
        .then((data) => {
          if (data?.chatId) {
            mutate([`/api/chat/between`, userA, userB], data, false);
          }
        })
        .catch((error) => {
          console.error("Error creating chat:", error);
        });
    }
  }, [error]);

  return {
    chatId: data?.chatId,
    error: error?.message,
    isLoading,
  };
}
