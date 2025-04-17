import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { AvailableEmotion } from "../services/emotions"

interface EmotionsState {
  emotions: AvailableEmotion[]
  setEmotions: (emotions: AvailableEmotion[]) => void
}

export const useEmotionsStore = create<EmotionsState>()(
  persist(
    (set) => ({
      emotions: [],
      setEmotions: (emotions) => set({ emotions }),
    }),
    {
      name: "emotions-storage",
    }
  )
)
