import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { getUserLocation } from "../utils/getUserLocation"
import { useEffect, useRef } from "react"
import { useUserLocationStore } from "../store/userLocationStore"
import marker from "../assets/icons/marker.svg?url"
import { useLocation } from "react-router-dom"
import { useNearbyEmotions } from "../hooks/useNearbyEmotions"
import { renderEmotionMarkers } from "../utils/renderEmotionMarkers"
import { Box, CircularProgress, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import theme from "../theme"

export const MapView = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const { userLocation, setUserLocation } = useUserLocationStore()
  const mapRef = useRef<maplibregl.Map | null>(null)
  const markersRef = useRef<maplibregl.Marker[]>([])

  const { data, isLoading, isError } = useNearbyEmotions({
    latitude: userLocation?.latitude?.toString() || "",
    longitude: userLocation?.longitude?.toString() || "",
    radius: "10000",
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
        zoom: 15,
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
      {isVisible && isLoading && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            backgroundColor: "rgba(62, 62, 62, 0.8)",
            padding: "2rem",
            borderRadius: "1.875rem",
            border: "1px solid #FFFFFF",
            zIndex: 999,
          }}
        >
          <CircularProgress sx={{ color: "#FFFFFF" }} />
          <Typography
            variant="h6"
            sx={{
              color: "#FFFFFF",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {t("map.loadingEmotions")}
          </Typography>
        </Box>
      )}
      {isVisible && isError && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            backgroundColor: "rgba(62, 62, 62, 0.8)",
            padding: "2rem",
            borderRadius: "1.875rem",
            border: "1px solid #FFFFFF",
            zIndex: 999,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: theme.colors.lightRed,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {t("map.errorLoadingEmotions")}
          </Typography>
        </Box>
      )}
    </div>
  )
}
