import { create } from "zustand";

export const useUIStore = create((set) => ({
  preloaderComplete: false,
  transitioning: false,
  isVideoOpen: false,
  contactModalOpen: false,

  setPreloaderComplete: (val) => set({ preloaderComplete: val }),
  setTransitioning: (val) => set({ transitioning: val }),
  setIsVideoOpen: (val) => set({ isVideoOpen: val }),
  setContactModalOpen: (val) => set({ contactModalOpen: val }),
}));
