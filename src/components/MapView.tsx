import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { getUserLocation } from "../utils/getUserLocation"
import { useEffect } from "react"
import { useUserLocationStore } from "../store/userLocationStore"
import marker from "../assets/icons/marker.svg"

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
          "https://api.maptiler.com/maps/0195fe03-6eea-79e3-a9d3-d4531a0a351b/style.json?key=S27siZckn8M30xtrFfEn",
        center: [userLocation.longitude, userLocation.latitude],
        zoom: 14,
      })

      new maplibregl.Marker({
        element: (() => {
          const el = document.createElement('div');
          el.innerHTML = `<img src="${marker}" alt="marker" />`;
          return el;
        })(),
        anchor: "bottom",
      }).setLngLat([userLocation.longitude, userLocation.latitude]).addTo(map)

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
