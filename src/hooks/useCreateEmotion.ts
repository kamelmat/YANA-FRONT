import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthStore } from "../store/authStore"
import { emotionsService } from "../services/emotions"

export const useCreateEmotion = () => {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { emotion_id: string; latitude: number; longitude: number }) => {
      if (!accessToken) throw new Error("No access token available")
      return emotionsService.createEmotion(data, accessToken)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nearbyEmotions"] })
    },
  })
}
