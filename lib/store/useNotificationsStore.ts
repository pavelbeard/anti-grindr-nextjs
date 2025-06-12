import { create } from "zustand";

interface INotificationsStore {
  messageNotifications: number;
  setMessageNotifications: (count: number) => void;
  resetMessageNotifications: () => void;
  hasUnreadMessages: boolean;
  setHasUnreadMessages: (value: boolean) => void;
}

export const useNotificationsStore = create<INotificationsStore>((set) => ({
  messageNotifications: 0,
  setMessageNotifications: (count) => set({ messageNotifications: count }),
  resetMessageNotifications: () => set({ messageNotifications: 0 }),
  hasUnreadMessages: false,
  setHasUnreadMessages: (value) => set({ hasUnreadMessages: value }),
}));
