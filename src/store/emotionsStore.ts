import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { AvailableEmotion } from "../services/emotions"

interface EmotionsState {
  emotions: AvailableEmotion[]
  setEmotions: (emotions: AvailableEmotion[]) => void
  lastSelectedEmotion: string | null
  setLastSelectedEmotion: (emotionId: string | null) => void
}

export const useEmotionsStore = create<EmotionsState>()(
  persist(
    (set) => ({
      emotions: [],
      setEmotions: (emotions) => set({ emotions }),
      lastSelectedEmotion: null,
      setLastSelectedEmotion: (emotionId) => set({ lastSelectedEmotion: emotionId }),
    }),
    {
      name: "emotions-storage",
    }
  )
)
