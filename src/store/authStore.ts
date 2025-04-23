import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  name: string | null;
  avatarId: string | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setName: (name: string | null) => void;
  setAvatarId: (id: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      name: null,
      avatarId: null,
      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      setName: (name) => set({ name }),
      setAvatarId: (id) => set({ avatarId: id }),
      clearAuth: () => set({ accessToken: null, refreshToken: null, name: null, avatarId: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
