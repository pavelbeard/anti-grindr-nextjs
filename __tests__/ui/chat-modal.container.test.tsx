import { describe, it, expect, vi } from "vitest";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import ChatRealtime from "@/components/web/chat/chat-realtime";
import { Message } from "@/lib/data/chat/chat.types";
import { Suspense } from "react";
import useChatMessages from "@/lib/hooks/message/useChatMessages";

const messages: { [key: string]: Message[] } = {
  chat1: [{ id: "msg1", userId: "testUserId1", text: "Hello" }] as Message[],
  chat2: [{ id: "msg2", userId: "testUserId2", text: "World" }] as Message[],
  chat3: [{ id: "msg3", userId: "testUserId3", text: "!" }] as Message[],
};

vi.mock("@/lib/store/useChatModalStore", () => ({
  useChatModalStore: () => ({
    modals: [
      { chatId: "chat1", userIdReceiver: "user1", isCollapsed: false },
      { chatId: "chat2", userIdReceiver: "user2", isCollapsed: false },
      { chatId: "chat3", userIdReceiver: "user3", isCollapsed: false },
    ],
  }),
}));

vi.mock("@/lib/hooks/chat/useChatWrapper", () => ({
  __esModule: true,
  default: () => ({
    loadMessagesPromise: vi.fn(),
  }),
}));

vi.mock("@clerk/nextjs", () => ({
  useUser: () => ({
    user: { id: "testUserId" },
  }),
}));


vi.mock("@/lib/hooks/chat/useUserInfo", () => ({
  __esModule: true,
  default: () => ({
    userInfo: { id: "testUserId", name: "Test User" },
  }),
}));

vi.mock("@/lib/hooks/chat/useBroadcast", () => ({
  __esModule: true,
  default: () => ({
    isConnected: true,
    sendMessage: vi.fn(),
  }),
}));

vi.mock("@/lib/hooks/message/useChatMessages", () => ({
  __esModule: true,
  default: () => ({
    allMessages: Object.values(messages).flat(),
    onMessage: vi.fn(),
    setFeed: vi.fn(),
    IsBtnScrollToBottomVisible: false,
    disableScrollToBottom: vi.fn(),
    newMessagesCount: 0,
  }),
}));

describe("<ChatModalContainer /> Integration Tests", () => {
  it("it renders ChatRealtime with Suspense correctly", async () => {
    let promiseResolve: (value: Message[]) => void;
    const promise = new Promise<Message[]>((resolve) => {
      promiseResolve = resolve;
    });

    const modals = [
      { chatId: "chat1", userIdReceiver: "user1", isCollapsed: false },
      { chatId: "chat2", userIdReceiver: "user2", isCollapsed: false },
      { chatId: "chat3", userIdReceiver: "user3", isCollapsed: false },
    ];

    const container = modals.map((chat) => (
      <Suspense key={chat.chatId} fallback={<div>Loading messages...</div>}>
        <ChatRealtime
          roomName={chat.chatId}
          withUserId={chat.userIdReceiver}
          isCollapsed={!chat.isCollapsed}
          loadMessagesPromise={promise} // Simulating the promise
        />
      </Suspense>
    ));

    await act(async () => {
      render(<div>{container}</div>);
    });

    screen.getAllByText("Loading messages...");

    await act(async () => {
      promiseResolve(Object.values(messages).flat());
      await promise;
    });

    await waitFor(() => {
      expect(screen.getAllByRole("dialog")).toHaveLength(3);
    });

    screen.debug();
  });
});
