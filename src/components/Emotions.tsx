import type React from "react"
import { Box, Typography, IconButton } from "@mui/material"
import type { Theme } from "@mui/material/styles"
import { useTheme } from "@mui/material/styles"
import styled from "@emotion/styled"
import { useScreenSize } from "../hooks/useScreenSize"
import { useTranslation } from "react-i18next"
import { useEmotionsStore } from "../store/emotionsStore"
import type { AvailableEmotion } from "../services/emotions"
import { useCreateEmotion } from "../hooks/useCreateEmotion"
import { useUserLocationStore } from "../store/userLocationStore"
import sadnessIcon from "../assets/icons/tristeza.svg?url"
import distressIcon from "../assets/icons/angustia.svg?url"
import lonelinessIcon from "../assets/icons/soledad.svg?url"
import reluctanceIcon from "../assets/icons/desgano.svg?url"
import tranquilityIcon from "../assets/icons/tranquilidad.svg?url"
import { useState } from "react"
import theme from "../theme"

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
  const emotions = useEmotionsStore((state: { emotions: AvailableEmotion[] }) => state.emotions)
  const { mutate: createEmotion } = useCreateEmotion()
  const userLocation = useUserLocationStore((state) => state.userLocation)
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)

  const getIconSize = () => {
    switch (screenSize) {
      case "sm":
        return "3rem"
      case "md":
        return "4.5rem"
      case "lg":
        return "5.25rem"
      default:
        return "5.25rem"
    }
  }

  const iconSize = getIconSize()

  const handleEmotionClick = (emotionId: string) => {
    setSelectedEmotion(emotionId)
    if (userLocation.latitude && userLocation.longitude) {
      createEmotion({
        emotion_id: emotionId,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      })
    }
  }

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: {
          sm: "2vh",
          xs: 0,
        },
        left: { lg: "50%", md: "55%", sm: "55%", xs: "50%" },
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
        }}
      >
        {t("emotions.questionEmotion")}
      </Typography>
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
            selected={selectedEmotion === emotion.id}
            onClick={() => handleEmotionClick(emotion.id)}
            sx={{
              flex: 1,
              minWidth: 0,
              "--emotion-color": EMOTIONS_COLORS[emotion.name.toLowerCase() as keyof typeof EMOTIONS_COLORS],
              "& svg, & img": {
                width: iconSize,
                height: iconSize,
              },
            }}
          >
            <img
              src={EMOTIONS_ICONS[emotion.name.toLowerCase() as keyof typeof EMOTIONS_ICONS]}
              alt={emotion.name}
              style={{ width: iconSize, height: iconSize }}
            />
            <Typography variant="body2" sx={{ marginTop: "0.5rem", color: "#FFFFFF" }}>
              {emotion.name}
            </Typography>
          </StyledEmotionButton>
        ))}
      </Box>
    </Box>
  )
}

export default Emotions
