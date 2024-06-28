import { create } from "zustand";

const useDrawerStore = create((set) => ({
  onOpen: false,
  setOpen: (v:boolean) => set((state: any) => ({ onOpen: v })),
}));

export default useDrawerStore;
