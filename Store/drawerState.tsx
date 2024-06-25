import { create } from "zustand";

const useDrawerStore = create((set) => ({
  left: 0,
  open: true,
  openDrawer: () => set((state: any) => ({ open: true })),
  closeDrawer: () => set((state: any) => ({ open: false })),
  setLeft: (v: number) => set((state: any) => ({ left: v })),
}));

export default useDrawerStore;
