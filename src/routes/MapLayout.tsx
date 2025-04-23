import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { MapView } from "../components/MapView";
import { useAvailableEmotions } from "../hooks/useAvailableEmotions";
import { usePersistentEmotionsStore } from "../store/emotionsStore";

const MapLayout = () => {
  const { data: availableEmotions } = useAvailableEmotions();
  const setEmotions = usePersistentEmotionsStore((state) => state.setEmotions);

  useEffect(() => {
    if (availableEmotions) {
      setEmotions(availableEmotions);
    }
  }, [availableEmotions, setEmotions]);

  return (
    <div>
      <MapView />
      <Outlet />
    </div>
  );
};

export default MapLayout;
