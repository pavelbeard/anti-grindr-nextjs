import { useCallback, useRef } from "react";

export default function useChatScroll() {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = useCallback(() => {
    if (!chatContainerRef.current) return;

    const container = chatContainerRef.current;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  return {
    chatContainerRef,
    scrollToBottom,
  };
}
