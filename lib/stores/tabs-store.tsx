import { create } from "zustand";

type Tabs = {
  tab: "members" | "gazes" | "chats";
};

type Action = {
  setNewTab: (tab: string) => void;
};

const useTabStore = create<Tabs & Action>((set) => ({
  tab: "members",
  setNewTab: (tab) => {
    set({ tab: tab as Tabs["tab"] });
  },
}));

const useTab = () => {
  const tab = useTabStore((state) => state.tab);
  const setTab = useTabStore((state) => state.setNewTab);

  return {
    tab,
    setTab,
  };
}

export { useTab };
