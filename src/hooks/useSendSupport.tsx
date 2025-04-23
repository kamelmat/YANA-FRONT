import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "../store/authStore"
import { emotionsService } from "../services/emotions"

export const useSendSupport = () => {
  const accessToken = useAuthStore((state) => state.accessToken)

  if (!accessToken) {
    throw new Error("No access token available")
  }

  return useMutation({
    mutationFn: (data: { shared_emotion: number | null; template: string }) =>
      emotionsService.sendSupport(data, accessToken),
  })
}
