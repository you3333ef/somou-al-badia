'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Tent } from '@/types/tent';

interface CompareState {
  tents: Tent[];
  addTent: (tent: Tent) => void;
  removeTent: (tentId: string) => void;
  clearAll: () => void;
  isTentInCompare: (tentId: string) => boolean;
}

export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      tents: [],
      addTent: (tent: Tent) =>
        set((state) => {
          if (state.tents.length >= 3) {
            return state;
          }
          if (state.tents.some((t) => t.id === tent.id)) {
            return state;
          }
          return { tents: [...state.tents, tent] };
        }),
      removeTent: (tentId: string) =>
        set((state) => ({
          tents: state.tents.filter((t) => t.id !== tentId),
        })),
      clearAll: () => set({ tents: [] }),
      isTentInCompare: (tentId: string) =>
        get().tents.some((t) => t.id === tentId),
    }),
    {
      name: 'somou-compare-storage',
    }
  )
);
