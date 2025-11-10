import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

export type UiStoreActiveTab = "t2v" | "i2v";
export type UiStore = {
  activeTab: UiStoreActiveTab;
  t2vVideoModel: string;
  i2vVideoModel: string;
  drawerOpen: boolean;
};

const STORAGE_KEY = "UI_STATE";
const defaultState: UiStore = {
  activeTab: "t2v",
  t2vVideoModel: "",
  i2vVideoModel: "",
  drawerOpen: false,
};

const createStorage = () => {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => null,
      removeItem: () => null,
    };
  }
  const existingData = sessionStorage.getItem(STORAGE_KEY);
  if (!existingData) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
  }

  return sessionStorage;
};

export const uiStoreAtom = atomWithStorage<UiStore>(
  STORAGE_KEY,
  defaultState,
  createJSONStorage(() => createStorage()),
  {
    getOnInit: true,
  }
);

export const updateVideoModelAtom = atom(
  null,
  (_, set, update: { type: UiStoreActiveTab; value: string }) => {
    set(uiStoreAtom, (prev) => ({
      ...prev,
      [`${update.type}VideoModel`]: update.value,
    }));
  }
);
