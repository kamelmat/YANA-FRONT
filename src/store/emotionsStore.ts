import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AvailableEmotion } from '../services/emotions';

interface PersistentEmotionsState {
  emotions: AvailableEmotion[];
  setEmotions: (emotions: AvailableEmotion[]) => void;
}

interface NonPersistentEmotionsState {
  lastSelectedEmotion: string | null;
  setLastSelectedEmotion: (emotionId: string | null) => void;
}

export const usePersistentEmotionsStore = create<PersistentEmotionsState>()(
  persist(
    (set) => ({
      emotions: [],
      setEmotions: (emotions) => set({ emotions }),
    }),
    {
      name: 'emotions-storage',
    }
  )
);

export const useNonPersistentEmotionsStore = create<NonPersistentEmotionsState>()((set) => ({
  lastSelectedEmotion: null,
  setLastSelectedEmotion: (emotionId) => set({ lastSelectedEmotion: emotionId }),
}));
