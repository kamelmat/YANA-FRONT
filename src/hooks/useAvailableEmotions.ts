import { useQuery } from "@tanstack/react-query";
import { emotionsService } from "../services/emotions";
import { useAuthStore } from "../store/authStore";

export const useAvailableEmotions = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["availableEmotions"],
    queryFn: async () => {
      if (!accessToken) throw new Error("No access token available");
      return emotionsService.getAvailableEmotions(accessToken);
    },
    enabled: !!accessToken,
  });
};
