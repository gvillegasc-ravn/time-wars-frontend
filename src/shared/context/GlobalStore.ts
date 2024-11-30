import { MantineColorScheme } from "@mantine/core";
import { create } from "zustand";

type State = {
  themeColor: MantineColorScheme;
  setThemeColor: (themeColor: MantineColorScheme) => void;
};

export const useGlobalStore = create<State>((set) => ({
  themeColor: "dark",
  setThemeColor: (themeColor) => set({ themeColor }),
}));
