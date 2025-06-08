import { ChatWrapper } from "@/components/web/chat/chat-modal-container";
import { render, screen } from "@testing-library/react";
import { describe, vi, it } from "vitest";
import { ChatContext } from "@/lib/providers/chat-provider";

describe("<ChatWrapper />", () => {
  it("should render loading state when chatId is not available", () => {
    render(
      <ChatWrapper
        chat={{
          chatId: undefined,
          userIdReceiver: "user123",
          userIdSender: "user456",
          expanded: true,
          lastActive: new Date(),
        }}
        onMessage={vi.fn()}
      />
    );

    // @ts-expect-error setupUiTests already defined and works, but TS doesn't recognize it
    expect(screen.getByText("Connecting to chat...")).toBeInTheDocument();
  });
  it("should render ChatRealtime when chatId is available", () => {
    // Mock ChatProvider from chat-provider-new
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ChatContext.Provider
        value={{
          openChats: [],
          handleOpenChat: vi.fn(),
          handleCloseChat: vi.fn(),
          handleToggleChatExpansion: vi.fn(),
          loadMessages: vi.fn(),
          updateFeed: vi.fn(),
        }}
      >
        {children}
      </ChatContext.Provider>
    );

    render(
      <ChatWrapper
        chat={{
          chatId: "chat123",
          userIdReceiver: "user123",
          userIdSender: "user456",
          expanded: true,
          lastActive: new Date(),
        }}
        onMessage={vi.fn()}
      />,
      { wrapper }
    );

    // @ts-expect-error setupUiTests already defined and works, but TS doesn't recognize it
    expect(screen.queryByText("Connecting to chat...")).not.toBeInTheDocument();
    // @ts-expect-error
    expect(screen.getByText("Chat with nothing")).toBeInTheDocument();

  });
});
