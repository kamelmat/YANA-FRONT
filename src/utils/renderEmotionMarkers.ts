import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import type { RefObject } from "react"

interface Emotion {
  latitude: string | number
  longitude: string | number
  emotion: string
  emotion_id: number
}

const emotionModules = import.meta.glob("../assets/emotions/*.svg", {
  query: "?url",
  import: "default",
  eager: true,
})

const emotionIcons: Record<string, string> = {}
for (const [path, url] of Object.entries(emotionModules)) {
  const fileName = path.split("/").pop()
  if (!fileName) continue
  const emotionName = fileName.replace(".svg", "").toLowerCase()
  emotionIcons[emotionName] = url as string
}

export const clearMarkers = (markersRef: RefObject<maplibregl.Marker[]>) => {
  if (markersRef.current) {
    for (const marker of markersRef.current) {
      marker.remove()
    }
    markersRef.current = []
  }
}

export const renderEmotionMarkers = (
  data: Emotion[],
  mapRef: RefObject<maplibregl.Map | null>,
  markersRef: RefObject<maplibregl.Marker[]>
) => {
  clearMarkers(markersRef)
  const markerOffsets: Record<string, number> = {}
  for (const checked_emotion of data) {
    if (checked_emotion.latitude && checked_emotion.longitude) {
      const icon = emotionIcons[checked_emotion.emotion.toLowerCase()]
      if (!icon) {
        console.warn(`No icon found for emotion: ${checked_emotion.emotion}`)
        continue
      }

      const coords = `${checked_emotion.latitude},${checked_emotion.longitude}`
      markerOffsets[coords] = (markerOffsets[coords] || 0) + 0.0001
      const offset = markerOffsets[coords]

      const marker = new maplibregl.Marker({
        element: (() => {
          const el = document.createElement("div")
          el.innerHTML = `<img src="${icon}" alt="${checked_emotion.emotion}" style="width: 32px; height: 32px;" />`
          return el
        })(),
        anchor: "bottom",
      })
        .setLngLat([
          Number.parseFloat(checked_emotion.longitude.toString()) + offset,
          Number.parseFloat(checked_emotion.latitude.toString()) + offset,
        ])
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        .addTo(mapRef.current!)
      markersRef.current = markersRef.current || []
      markersRef.current.push(marker)
    }
  }
}
