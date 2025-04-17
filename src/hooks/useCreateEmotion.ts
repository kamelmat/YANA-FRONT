import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "../store/authStore"
import { emotionsService } from "../services/emotions"

export const useCreateEmotion = () => {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useMutation({
    mutationFn: async (data: { emotion_id: string; latitude: number; longitude: number }) => {
      if (!accessToken) throw new Error("No access token available")
      return emotionsService.createEmotion(data, accessToken)
    },
  })
}
