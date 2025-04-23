import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth";
import type { LoginData } from "../services/auth";
import { useAuthStore } from "../store/authStore";

export const useLogin = () => {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken);
  const setName = useAuthStore((state) => state.setName);
  const setAvatarId = useAuthStore((state) => state.setAvatarId);

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await authService.login(data);

      if (response.access) setAccessToken(response.access);
      if (response.refresh) setRefreshToken(response.refresh);
      if (response.user.name) setName(response.user.name);
      if (response.user.avatar_id) setAvatarId(response.user.avatar_id);

      return response;
    },
    onSuccess: () => navigate("/"),
  });
};
