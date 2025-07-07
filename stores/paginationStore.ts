import { create } from "zustand";

interface PaginationState {
  limit: number;
  setLimit: (value: number) => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  limit: 5,
  setLimit: (value) => set({ limit: value }),
}));
