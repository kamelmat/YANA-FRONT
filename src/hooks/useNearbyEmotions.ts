import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "../store/authStore"
import { EMOTIONS_ENDPOINTS } from "../config/apiEndpoints"

interface Props {
  latitude: string
  longitude: string
}

const fetchNearbyEmotions = async ({ latitude, longitude }: Props, accessToken: string) => {
  const url = new URL(EMOTIONS_ENDPOINTS.GET_NEARBY_EMOTIONS)
  url.searchParams.set("latitude", latitude)
  url.searchParams.set("longitude", longitude)
  url.searchParams.set("radius", "20000")

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

export const useNearbyEmotions = ({ latitude, longitude }: Props) => {
  const accessToken = useAuthStore((state) => state.accessToken)

  const query = useQuery({
    queryKey: ["nearbyEmotions", latitude, longitude],
    queryFn: () => fetchNearbyEmotions({ latitude, longitude }, accessToken ?? ""),
    enabled: false, // Disable automatic fetching
    gcTime: 0, // Don't cache the results
  })

  return query
}
