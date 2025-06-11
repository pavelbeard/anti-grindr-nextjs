import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ChatModal {
  chatId: string;
  userIdReceiver: string;
  isCollapsed: boolean;
}

interface ChatModalsStore {
  modals: ChatModal[];
  openChat: (chat: { chatId: string; userIdReceiver: string }) => void;
  closeChat: (chatId: string) => void;
  toggleCollapse: (chatId: string) => void;
  focusChat: (chatId: string) => void;
}

export const useChatModalStore = create<ChatModalsStore>()(
  persist(
    (set, get) => ({
      modals: [],
      openChat: ({ chatId, userIdReceiver }) => {
        const existing = get().modals.find((modal) => modal.chatId === chatId);
        if (!existing) {
          const updated = [
            ...get().modals,
            { chatId, userIdReceiver, isCollapsed: false },
          ];
          set({ modals: updated });
        } else {
          get().focusChat(chatId);
        }
      },
      closeChat: (chatId) => {
        set({
          modals: get().modals.filter((modal) => modal.chatId !== chatId),
        });
      },
      toggleCollapse: (chatId) => {
        set({
          modals: get().modals.map((modal) =>
            modal.chatId === chatId
              ? { ...modal, isCollapsed: !modal.isCollapsed }
              : modal
          ),
        });
      },
      focusChat: (chatId) => {
        set({
          modals: get().modals.map((modal) =>
            modal.chatId === chatId ? { ...modal, isCollapsed: false } : modal
          ),
        });
      },
    }),
    { name: "chat-modals-storage" }
  )
);
