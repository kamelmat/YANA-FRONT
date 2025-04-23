import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth";
import { useAuthStore } from "../store/authStore";

const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes before expiration

export const useTokenRefresh = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken || !refreshToken) return;

    const refreshAccessToken = async () => {
      try {
        const response = await authService.refreshToken(refreshToken);
        setAccessToken(response.access);
      } catch (error) {
        console.error("Failed to refresh token:", error);
        clearAuth();
        navigate("/login");
      }
    };

    const tokenParts = accessToken.split(".");
    if (tokenParts.length !== 3) {
      console.error("Invalid JWT format");
      return;
    }

    try {
      const payload = JSON.parse(atob(tokenParts[1]));
      const expirationTime = payload.exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime;

      if (timeUntilExpiration < TOKEN_REFRESH_THRESHOLD) {
        refreshAccessToken();
      }

      const timer = setTimeout(() => {
        refreshAccessToken();
      }, timeUntilExpiration - TOKEN_REFRESH_THRESHOLD);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error parsing JWT:", error);
      clearAuth();
      navigate("/login");
    }
  }, [accessToken, refreshToken, setAccessToken, clearAuth, navigate]);
};
