import type React from "react"
import { Box, Typography, IconButton, CircularProgress } from "@mui/material"
import type { Theme } from "@mui/material/styles"
import { useTheme } from "@mui/material/styles"
import styled from "@emotion/styled"
import useScreenSize from "../hooks/useScreenSize"
import { useTranslation } from "react-i18next"
import { usePersistentEmotionsStore, useNonPersistentEmotionsStore } from "../store/emotionsStore"
import type { AvailableEmotion } from "../services/emotions"
import { useCreateEmotion } from "../hooks/useCreateEmotion"
import { useUserLocationStore } from "../store/userLocationStore"
import { useNearbyEmotions } from "../hooks/useNearbyEmotions"
import distressIcon from "../assets/emotions/distress.svg?url"
import lonelinessIcon from "../assets/emotions/loneliness.svg?url"
import reluctanceIcon from "../assets/emotions/reluctance.svg?url"
import tranquilityIcon from "../assets/emotions/tranquility.svg?url"
import sadnessIcon from "../assets/emotions/sadness.svg?url"
import theme from "../theme"
import { useState } from "react"
import { useAvailableEmotions } from "../hooks/useAvailableEmotions"
import HelpModal from "./HelpModal"

interface StyledEmotionButtonProps {
  selected?: boolean
}

const EMOTIONS_ICONS = {
  sadness: sadnessIcon,
  distress: distressIcon,
  loneliness: lonelinessIcon,
  reluctance: reluctanceIcon,
  tranquility: tranquilityIcon,
}

const EMOTIONS_COLORS = {
  sadness: theme.colors.lightBlue,
  distress: theme.colors.pink,
  loneliness: theme.colors.green,
  reluctance: theme.colors.orange,
  tranquility: theme.colors.yellow,
}

const StyledEmotionButton = styled(IconButton)<StyledEmotionButtonProps>(({ selected }) => ({
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  color: "#FFFFFF",
  "&:hover": {
    background: "transparent",
  },
  "& svg, & img": {
    fontSize: "2.5rem",
    width: "2.5rem",
    height: "2.5rem",
    color: "#FFFFFF",
    filter: selected ? "drop-shadow(0 0 10px var(--emotion-color))" : "none",
    transition: "filter 0.3s ease-in-out",
  },
}))

const Emotions: React.FC = () => {
  const theme = useTheme() as Theme
  const screenSize = useScreenSize()
  const { t } = useTranslation()
  const emotions = usePersistentEmotionsStore((state) => state.emotions)
  const { lastSelectedEmotion, setLastSelectedEmotion } = useNonPersistentEmotionsStore()
  const { mutate: createEmotion } = useCreateEmotion()
  const userLocation = useUserLocationStore((state) => state.userLocation)
  const [isCreatingEmotion, setIsCreatingEmotion] = useState(false)
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
  const { isLoading: isLoadingAvailableEmotions } = useAvailableEmotions()

  const { refetch: fetchNearbyEmotions, isRefetching } = useNearbyEmotions({
    latitude: userLocation?.latitude?.toString() || "",
    longitude: userLocation?.longitude?.toString() || "",
  })

  const isDisabled = isRefetching || isCreatingEmotion || isLoadingAvailableEmotions
  const showLoading = emotions.length === 0

  const getIconSize = () => {
    switch (screenSize) {
      case "xl":
        return "5.25rem"
      case "md":
      case "lg":
        return "4rem"
      default:
        return "3rem"
    }
  }

  const iconSize = getIconSize()

  const handleEmotionClick = (emotionId: string, emotionName: string) => {
    setLastSelectedEmotion(emotionId)
    
    if (emotionName.toLowerCase() === 'reluctance') {
      setIsHelpModalOpen(true)
    }
    
    if (userLocation.latitude && userLocation.longitude) {
      setIsCreatingEmotion(true)
      createEmotion(
        {
          emotion_id: emotionId,
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        },
        {
          onSuccess: () => {
            fetchNearbyEmotions().then(() => {
              setIsCreatingEmotion(false)
            })
          },
          onError: () => {
            setIsCreatingEmotion(false)
          }
        }
      )
    }
  }

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: {
            sm: "2vh",
            xs: 0,
          },
          left: "50%",
          transform: "translateX(-50%)",
          width: {
            lg: "814px",
            sm: "40rem",
            xs: "100%",
          },
          height: { lg: "auto", md: "auto", sm: "auto", xs: "auto" },
          maxHeight: "238.78px",
          padding: {
            md: "1.5rem",
            sm: "1rem",
            xs: "1rem 1rem 6.375rem 1rem",
          },
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "1.875rem",
          border: {
            sm: "1px solid #FFFFFF",
          },
          backgroundColor: {
            sm: "#3E3E3ECC",
            xs: theme.colors.blackBackground,
          },
          color: "#FFFFFF",
          opacity: isDisabled ? 0.9 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontSize: {
              lg: "2rem",
              md: "1.5rem",
              xs: "1rem",
            },
            opacity: isDisabled ? 0.6 : 1,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {t("emotions.questionEmotion")}
        </Typography>
        {showLoading ? (
          <CircularProgress sx={{ color: "#FFFFFF" }} />
        ) : (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {emotions.map((emotion: AvailableEmotion) => (
              <StyledEmotionButton
                key={emotion.id}
                selected={lastSelectedEmotion === emotion.id}
                onClick={() => handleEmotionClick(emotion.id, emotion.name)}
                disabled={isDisabled}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  "--emotion-color": EMOTIONS_COLORS[emotion.name.toLowerCase() as keyof typeof EMOTIONS_COLORS],
                  "& svg, & img": {
                    width: iconSize,
                    height: iconSize,
                  },
                  "&.Mui-disabled": {
                    opacity: 0.5,
                  },
                }}
              >
                <img
                  src={EMOTIONS_ICONS[emotion.name.toLowerCase() as keyof typeof EMOTIONS_ICONS]}
                  alt={emotion.name}
                  style={{ width: iconSize, height: iconSize }}
                />
                <Typography variant="body2" sx={{ marginTop: "0.5rem", color: "#FFFFFF" }}>
                  {t(`emotions.${emotion.name.toLowerCase()}`)}
                </Typography>
              </StyledEmotionButton>
            ))}
          </Box>
        )}
      </Box>
      <HelpModal open={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
    </>
  )
}

export default Emotions
