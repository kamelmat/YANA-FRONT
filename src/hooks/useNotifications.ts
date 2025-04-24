import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { useNotificationsStore } from "../store/notificationsStore";
import { notificationsService } from "../services/notifications";
import { useSettingsStore } from "../store/useSettingsStore";
import notificationSoundFile from "../assets/sounds/notification.mp3";
import { useEffect } from "react";

const POLLING_INTERVAL = 10000; // Poll every 10 seconds

const notificationSound = new Audio(notificationSoundFile);

export const useNotifications = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { hasNotifications, setHasNotifications } = useNotificationsStore();
  const { settings } = useSettingsStore();

  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      if (!settings.notifications) {
        return false;
      }

      return await notificationsService.getNotifications(accessToken);
    },
    refetchInterval: POLLING_INTERVAL,
    enabled: !!accessToken && settings.notifications,
  });

  useEffect(() => {
    if (data !== undefined) {
      if (
        data &&
        !hasNotifications &&
        settings.notifications &&
        settings.appSounds
      ) {
        notificationSound.play().catch((error) => {
          console.error("Error playing notification sound:", error);
        });
      }
      setHasNotifications(data);
    }
  }, [
    data,
    hasNotifications,
    settings.notifications,
    settings.appSounds,
    setHasNotifications,
  ]);

  return data;
};
