import { create } from "zustand";

interface UserLocation {
  latitude: number | null;
  longitude: number | null;
}

export const useUserLocationStore = create<{
  userLocation: UserLocation;
  setUserLocation: (latitude: number, longitude: number) => void;
}>((set) => ({
  userLocation: { latitude: null, longitude: null },
  setUserLocation: (latitude, longitude) => set({ userLocation: { latitude, longitude } }),
}));
