import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  user: any;
};

type Action = {
  updateUser: (user: State["user"]) => void;
};

const useStore = create(
  persist<State & Action>(
    (set) => ({
      user: "vineeth",
      updateUser: (user) => set(() => ({ user: user })),
    }),
    {
      name: "user",
    }
  )
);

export default useStore;
