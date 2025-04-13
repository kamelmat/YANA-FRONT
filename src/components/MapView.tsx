import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { getUserLocation } from "../utils/getUserLocation"
import { useEffect } from "react"
import { useUserLocationStore } from "../store/userLocationStore"
import marker from "../assets/icons/marker.svg"
import { useRef } from "react"
import { useLocation } from "react-router-dom"


export const MapView = () => {
  const location = useLocation()
  const { userLocation, setUserLocation } = useUserLocationStore()
  const mapRef = useRef<maplibregl.Map | null>(null)

  const isVisible = location.pathname === "/"

  useEffect(() => {
    if (isVisible) {
      getUserLocation()
        .then(([latitude, longitude]) => {
          setUserLocation(latitude, longitude)
        })
        .catch((error) => {
          console.error("Error al obtener la ubicación:", error)
        })
    }
  }, [setUserLocation, isVisible])

  useEffect(() => {
    if (
      userLocation &&
      userLocation.latitude !== null &&
      userLocation.longitude !== null &&
      !mapRef.current
    ) {
      mapRef.current = new maplibregl.Map({
        container: "map",
        style:
          "https://api.maptiler.com/maps/0195fe03-6eea-79e3-a9d3-d4531a0a351b/style.json?key=S27siZckn8M30xtrFfEn",
        center: [userLocation.longitude, userLocation.latitude],
        zoom: 14,
      })

      new maplibregl.Marker({
        element: (() => {
          const el = document.createElement("div")
          el.innerHTML = `<img src="${marker}" alt="marker" />`
          return el
        })(),
        anchor: "bottom",
      })
        .setLngLat([userLocation.longitude, userLocation.latitude])
        .addTo(mapRef.current)
    }
  }, [userLocation])

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <div>
      <div
        id="map"
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          zIndex: -1,
          display: isVisible ? "block" : "none",
        }}
      />
    </div>
  )
}
