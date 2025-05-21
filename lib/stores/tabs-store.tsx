import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { create } from "zustand";

type Tabs = {
  tab: "grid" | "gazes" | "chats";
};

type Action = {
  setNewTab: (tab: string) => void;
};

const useTabStore = create<Tabs & Action>((set) => ({
  tab: "grid",
  setNewTab: (tab) => {
    set({ tab: tab as Tabs["tab"] });
  },
}));

const useTab = () => {
  const pathname = usePathname();
  const tab = useTabStore((state) => state.tab);
  const setTab = useTabStore((state) => state.setNewTab);

  useEffect(() => {
    const anchor = window.location.hash;

    if (anchor) {
      setTab(anchor.split("#")[1] as Tabs["tab"]);
    }
  }, [pathname]);

  return {
    tab,
    setTab,
  };
};

export { useTab };
