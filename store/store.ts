import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  win1: string;
  win2: string;
};

type Action = {
  updateWin1: (win1: State["win1"]) => void;
  updateWin2: (win2: State["win2"]) => void;
};

const useStore = create(
  persist<State & Action>(
    (set) => ({
      win1: "",
      win2: "",
      updateWin1: (win1) => set(() => ({ win1: win1 })),
      updateWin2: (win2) => set(() => ({ win2: win2 })),
    }),
    {
      name: "windows",
    }
  )
);

export default useStore;
