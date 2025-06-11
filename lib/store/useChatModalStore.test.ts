import { beforeEach, describe, expect, it } from "vitest";
import { useChatModalStore } from "./useChatModalStore";

describe("useChatModalStore", () => {
  const initialState = useChatModalStore.getState();
  beforeEach(() => {
    // Reset the store before each test
    useChatModalStore.setState(initialState);
  });

  it("should open a new chat modal", () => {
    const chat = { chatId: "chat1", userIdReceiver: "user1" };
    useChatModalStore.getState().openChat(chat);
    const modals = useChatModalStore.getState().modals;
    expect(modals).toHaveLength(1);
    expect(modals[0]).toEqual({ ...chat, isCollapsed: false });
  });

  it("should not open a duplicate chat modal", () => {
    const chat = { chatId: "chat1", userIdReceiver: "user1" };
    useChatModalStore.getState().openChat(chat);
    useChatModalStore.getState().openChat(chat); // Attempt to open the same chat again
    const modals = useChatModalStore.getState().modals;
    expect(modals).toHaveLength(1);
  });

  it("should close a chat modal", () => {
    const chat = { chatId: "chat1", userIdReceiver: "user1" };
    useChatModalStore.getState().openChat(chat);
    useChatModalStore.getState().closeChat("chat1");
    const modals = useChatModalStore.getState().modals;
    expect(modals).toHaveLength(0);
  });

  it("should toggle collapse state of a chat modal", () => {
    const chat = { chatId: "chat1", userIdReceiver: "user1" };
    useChatModalStore.getState().openChat(chat);
    useChatModalStore.getState().toggleCollapse("chat1");
    const modals = useChatModalStore.getState().modals;
    expect(modals[0].isCollapsed).toBe(true);

    useChatModalStore.getState().toggleCollapse("chat1");
    const newModals = useChatModalStore.getState().modals;
    expect(newModals[0].isCollapsed).toBe(false);
  });

  it("should focus (reorder) a chat modal", () => {
    const chat1 = { chatId: "chat1", userIdReceiver: "user1" };
    const chat2 = { chatId: "chat2", userIdReceiver: "user2" };
    const chat3 = { chatId: "chat3", userIdReceiver: "user3" };
    const chat4 = { chatId: "chat4", userIdReceiver: "user4" };

    useChatModalStore.getState().openChat(chat1);
    useChatModalStore.getState().openChat(chat2);
    useChatModalStore.getState().openChat(chat3);
    useChatModalStore.getState().openChat(chat4);
    useChatModalStore.getState().focusChat("chat2");
    const modals = useChatModalStore.getState().modals;
    expect(modals[0].chatId).toBe("chat1");
    expect(modals[1].chatId).toBe("chat2");
    expect(modals[2].chatId).toBe("chat3");
    expect(modals[3].chatId).toBe("chat4");
  });
});
