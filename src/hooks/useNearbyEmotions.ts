import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "../store/authStore"
import { useNonPersistentEmotionsStore } from "../store/emotionsStore"

interface Props {
  latitude: string
  longitude: string
  radius: string
}

const urlCore = "http://127.0.0.1:8000"

const fetchNearbyEmotions = async ({ latitude, longitude, radius }: Props, accessToken: string) => {
  const url = new URL(`${urlCore}/emociones/api/nearby-emotions`)
  url.searchParams.set("latitude", latitude)
  url.searchParams.set("longitude", longitude)
  url.searchParams.set("radius", radius)

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!res.ok) {
    throw new Error("Error getting emotions")
  }

  return res.json()
}

export const useNearbyEmotions = ({ latitude, longitude, radius }: Props) => {
  const accessToken = useAuthStore((state) => state.accessToken)
  const lastSelectedEmotion = useNonPersistentEmotionsStore((state) => state.lastSelectedEmotion)

  const query = useQuery({
    queryKey: ["nearbyEmotions", latitude, longitude, radius],
    queryFn: () => fetchNearbyEmotions({ latitude, longitude, radius }, accessToken ?? ""),
    enabled: !!latitude && !!longitude && !!accessToken && !!lastSelectedEmotion,
    refetchInterval: lastSelectedEmotion ? 600000 : false, // Refetch every 10 minutes if emotion is selected
    refetchIntervalInBackground: true, // Continue refetching even when tab is not active
  })

  return query
}
