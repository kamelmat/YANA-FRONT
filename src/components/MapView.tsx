import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { getUserLocation } from "../utils/getUserLocation"
import { useEffect, useRef } from "react"
import { useUserLocationStore } from "../store/userLocationStore"
import marker from "../assets/icons/marker.svg"
import { useLocation } from "react-router-dom"
import { useNearbyEmotions } from "../hooks/useNearbyEmotions"
import { renderEmotionMarkers } from "../utils/renderEmotionMarkers"

export const MapView = () => {
  const location = useLocation()
  const { userLocation, setUserLocation } = useUserLocationStore()
  const mapRef = useRef<maplibregl.Map | null>(null)
  const markersRef = useRef<maplibregl.Marker[]>([])

  const { data, isLoading, isError, error } = useNearbyEmotions({
    latitude: userLocation?.latitude?.toString() || "",
    longitude: userLocation?.longitude?.toString() || "",
    radius: "20000000000",
  })

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
      !mapRef.current &&
      isVisible
    ) {
      mapRef.current = new maplibregl.Map({
        container: "map",
        style:
          "https://api.maptiler.com/maps/0195fe03-6eea-79e3-a9d3-d4531a0a351b/style.json?key=S27siZckn8M30xtrFfEn",
        center: [userLocation.longitude, userLocation.latitude],
        zoom: 14,
      })

      mapRef.current.on("styleimagemissing", (e) => {
        console.warn(`Style image missing: ${e.id}`)
      })

      new maplibregl.Marker({
        element: (() => {
          const el = document.createElement("div")
          el.innerHTML = `<img src="${marker}" alt="marker" style="width: 32px; height: 32px;" />`
          return el
        })(),
        anchor: "bottom",
      })
        .setLngLat([userLocation.longitude, userLocation.latitude])
        .addTo(mapRef.current)
    }

    if (data && mapRef.current) {
      renderEmotionMarkers(data, mapRef, markersRef)
    }
  }, [userLocation, data, isVisible])

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
      markersRef.current = []
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
      {isLoading && (
        <p
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "1.25rem",
            fontWeight: "bold",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "1rem 2rem",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 999,
          }}
        >
          Cargando emociones cercanas...
        </p>
      )}
      {isError && (
        <p
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "1.25rem",
            fontWeight: "bold",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "1rem 2rem",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 999,
          }}
        >
          Error cargando emociones: {error?.message}
        </p>
      )}
    </div>
  )
}
