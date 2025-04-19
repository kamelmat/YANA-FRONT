import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "../store/authStore"
import { emotionsService } from "../services/emotions"
import { useEmotionsStore } from "../store/emotionsStore"
import { useEffect } from "react"
import type { LastEmotionResponse } from "../services/emotions"

export const useLastEmotion = () => {
  const accessToken = useAuthStore((state) => state.accessToken)
  const setLastSelectedEmotion = useEmotionsStore((state) => state.setLastSelectedEmotion)
  const emotions = useEmotionsStore((state) => state.emotions)

  const query = useQuery<LastEmotionResponse | null>({
    queryKey: ["lastEmotion"],
    queryFn: async () => {
      if (!accessToken) throw new Error("No access token available")
      return emotionsService.getLastEmotion(accessToken)
    },
    enabled: !!accessToken,
  })

  useEffect(() => {
    const lastEmotion = query.data
    if (lastEmotion && emotions.length > 0) {
      const matchingEmotion = emotions.find(
        (e) => e.name.toLowerCase() === lastEmotion.emotion.toLowerCase()
      )
      if (matchingEmotion) {
        setLastSelectedEmotion(matchingEmotion.id)
      }
    }
  }, [query.data, emotions, setLastSelectedEmotion])

  return query
}
