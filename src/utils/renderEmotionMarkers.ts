import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { RefObject } from 'react';
interface Emotion {
  latitude: string | number;
  longitude: string | number;
  emotion: string;
  emotion_id: number;
  user_id: string;
}

const emotionModules = import.meta.glob('../assets/emotions/*.svg', {
  query: '?url',
  import: 'default',
  eager: true,
});

const emotionIcons: Record<string, string> = {};
for (const [path, url] of Object.entries(emotionModules)) {
  const fileName = path.split('/').pop();
  if (!fileName) continue;
  const emotionName = fileName.replace('.svg', '').toLowerCase();
  emotionIcons[emotionName] = url as string;
}

export const clearMarkers = (markersRef: RefObject<maplibregl.Marker[]>) => {
  if (markersRef.current) {
    for (const marker of markersRef.current) {
      marker.remove();
    }
    markersRef.current = [];
  }
};
export const renderEmotionMarkers = (
  data: Emotion[],
  mapRef: RefObject<maplibregl.Map | null>,
  markersRef: RefObject<maplibregl.Marker[]>,
  onMarkerClick: (userId: string, sharedEmotionId: number) => void // Updated to use shared_emotion_id
) => {
  clearMarkers(markersRef);
  const markerOffsets: Record<string, number> = {};

  // Optimize for large datasets - limit to closest 50 emotions
  const limitedData = data.slice(0, 50);

  let minLat = 90;
  let maxLat = -90;
  let minLng = 180;
  let maxLng = -180;

  for (const checked_emotion of limitedData) {
    if (!checked_emotion.latitude || !checked_emotion.longitude) continue;

    let lat = Number.parseFloat(checked_emotion.latitude.toString());
    let lng = Number.parseFloat(checked_emotion.longitude.toString());

    if (Math.abs(lat) > 90 || Math.abs(lng) > 180) {
      [lat, lng] = [lng, lat];
    }

    lat = Math.max(-90, Math.min(90, lat));
    lng = Math.max(-180, Math.min(180, lng));

    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);

    const icon = emotionIcons[checked_emotion.emotion.toLowerCase()];
    if (!icon) continue;

    if (Number.isNaN(lat) || Number.isNaN(lng)) continue;

    const coords = `${lat.toFixed(4)},${lng.toFixed(4)}`;
    markerOffsets[coords] = (markerOffsets[coords] || 0) + 1;
    const offset = markerOffsets[coords] * 0.0001;

    const marker = new maplibregl.Marker({
      element: (() => {
        const el = document.createElement('div');
        el.innerHTML = `<img src="${icon}" alt="${checked_emotion.emotion}" style="width: 40px; height: 40px;" />`;

        el.style.cursor = 'default';
        el.addEventListener('mouseenter', () => {
          el.style.cursor = 'pointer';
        });
        el.addEventListener('mouseleave', () => {
          el.style.cursor = 'default';
        });

        el.addEventListener('click', () => {
          onMarkerClick(checked_emotion.user_id, checked_emotion.shared_emotion_id);
        });

        return el;
      })(),
      anchor: 'bottom',
    }).setLngLat([lng + offset, lat + offset]);

    if (mapRef.current) {
      marker.addTo(mapRef.current);
      markersRef.current = markersRef.current || [];
      markersRef.current.push(marker);
    }
  }
};
