import { useCallback, useRef } from "react";

export default function useChatScroll() {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = useCallback(() => {
    if (!messagesContainerRef.current) return;

    const container = messagesContainerRef.current;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  return {
    messagesContainerRef,
    scrollToBottom,
  };
}
