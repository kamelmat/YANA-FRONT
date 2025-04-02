import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { getUserLocation } from "../utils/getUserLocation"
import { useEffect } from "react"
import { useUserLocationStore } from "../store/userLocationStore"

export const MapView = () => {
  const { userLocation, setUserLocation } = useUserLocationStore()

  useEffect(() => {
    getUserLocation()
      .then(([latitude, longitude]) => {
        setUserLocation(latitude, longitude)
      })
      .catch((error) => {
        console.error("Error al obtener la ubicación:", error)
      })
  }, [setUserLocation])

  useEffect(() => {
    if (userLocation && userLocation.latitude !== null && userLocation.longitude !== null) {
      const map = new maplibregl.Map({
        container: "map",
        style:
          "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
        center: [userLocation.longitude, userLocation.latitude],
        zoom: 14,
      })

      new maplibregl.Marker().setLngLat([userLocation.longitude, userLocation.latitude]).addTo(map)

      return () => map.remove()
    }
  }, [userLocation])

  return (
    <div>
      {!userLocation || userLocation.latitude === null || userLocation.longitude === null ? (
        <div>Obteniendo ubicación...</div>
      ) : null}
      <div id="map" style={{ width: "100vw", height: "100vh" }} />
    </div>
  )
}
