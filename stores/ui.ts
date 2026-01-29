import { create } from 'zustand';

interface UIState {
  isSideMenuOpen: boolean;
  toggleSideMenu: () => void;
  openSideMenu: () => void;
  closeSideMenu: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSideMenuOpen: false,
  toggleSideMenu: () => set((state) => ({ isSideMenuOpen: !state.isSideMenuOpen })),
  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),
}));
