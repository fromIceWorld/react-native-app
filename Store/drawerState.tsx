import { create } from "zustand";

const useDrawerStore = create((set) => ({
  open: true,
  openDrawer: () => set((state: any) => ({ open: true })),
  closeDrawer: () => set((state: any) => ({ open: false })),
}));

export default useDrawerStore;
