import { Message } from "@/lib/data/chat/chat.types";
import * as UserFeatures from "@/lib/features/user.features";
import { getMemberProfile } from "@/lib/helpers/chatProviderHelpers";
import { useCallback, useEffect, useMemo, useState } from "react";

interface IUseChatMessages {
  initialMessages: Message[];
  realtimeMessages: Message[];
  withUserId: string | undefined;
  onMessage?: (messages: Message[]) => void;
  scrollToBottom: () => void;
}

export default function useChatMessages({
  initialMessages,
  realtimeMessages,
  withUserId,
  onMessage,
  scrollToBottom,
}: IUseChatMessages) {
  const [userInfo, setUserInfo] = useState<Awaited<
    ReturnType<typeof UserFeatures.getMemberProfileInfo>
  > | null>(null);

  // Combine initial messages with realtime messages, ensuring uniqueness and sorting
  const allMessages = useMemo(() => {
    return [...initialMessages, ...realtimeMessages];
  }, [initialMessages, realtimeMessages]);

  // Fetch member info for the user we are chatting with
  const getMemberInfo = useCallback(async () => {
    if (!withUserId) return;

    const memberInfo = await getMemberProfile(withUserId);
    if (memberInfo) {
      setUserInfo(memberInfo);
    }
  }, [withUserId]);

  useEffect(() => {
    getMemberInfo();
  }, [getMemberInfo]);

  useEffect(() => {
    if (onMessage) {
      onMessage(allMessages);
    }
  }, [allMessages, onMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages, scrollToBottom]);

  return {
    allMessages,
    userInfo,
  };
}
