import type React from "react"
import { Box, Typography, IconButton } from "@mui/material"
import type { Theme } from "@mui/material/styles"
import styled from "@emotion/styled"
import { useScreenSize } from "../hooks/useScreenSize"
import { useTranslation } from "react-i18next"
import sadnessIcon from "../assets/icons/tristeza.svg?url"
import distressIcon from "../assets/icons/angustia.svg?url"
import lonelinessIcon from "../assets/icons/soledad.svg?url"
import reluctanceIcon from "../assets/icons/desgano.svg?url"
import tranquillityIcon from "../assets/icons/tranquilidad.svg?url"
import { useTheme } from "@mui/material"

export type Emotion = {
  name: string
  icon: React.ReactNode
}

interface StyledEmotionButtonProps {
  selected?: boolean
}

const StyledEmotionButton = styled(IconButton)<StyledEmotionButtonProps>({
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
  },
})

const Emotions: React.FC<{
  onEmotionClick?: (emotion: string) => void
}> = ({ onEmotionClick }) => {
  const theme = useTheme() as Theme
  const screenSize = useScreenSize()
  const { t } = useTranslation()

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

  const emotions: Emotion[] = [
    {
      name: t("emotions.sadness"),
      icon: (
        <img
          src={sadnessIcon}
          alt={t("emotions.sadness")}
          style={{ width: iconSize, height: iconSize }}
        />
      ),
    },
    {
      name: t("emotions.distress"),
      icon: (
        <img
          src={distressIcon}
          alt={t("emotions.distress")}
          style={{ width: iconSize, height: iconSize }}
        />
      ),
    },
    {
      name: t("emotions.loneliness"),
      icon: (
        <img
          src={lonelinessIcon}
          alt={t("emotions.loneliness")}
          style={{ width: iconSize, height: iconSize }}
        />
      ),
    },
    {
      name: t("emotions.reluctance"),
      icon: (
        <img
          src={reluctanceIcon}
          alt={t("emotions.reluctance")}
          style={{ width: iconSize, height: iconSize }}
        />
      ),
    },
    {
      name: t("emotions.tranquillity"),
      icon: (
        <img
          src={tranquillityIcon}
          alt={t("emotions.tranquillity")}
          style={{ width: iconSize, height: iconSize }}
        />
      ),
    },
  ]

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: {
          lg: "2vh",
          md: "2vh",
          sm: "2vh",
          xs: 0,
        },
        left: { lg: "50%", md: "55%", sm: "55%", xs: "50%" },
        transform: "translateX(-50%)",
        width: {
          lg: "814px",
          md: "48rem",
          sm: "40rem",
          xs: "100%",
        },
        height: { lg: "auto", md: "auto", sm: "auto", xs: "auto" },
        maxHeight: "238.78px",
        padding: {
          lg: "1.5rem",
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
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#FFFFFF",
        backgroundColor: {
          lg: "#3E3E3ECC",
          md: "#3E3E3ECC",
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
            sm: "1rem",
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
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {emotions.map((emotion) => (
          <StyledEmotionButton
            key={emotion.name}
            onClick={() => onEmotionClick?.(emotion.name)}
            sx={{
              "& svg, & img": {
                width: iconSize,
                height: iconSize,
              },
            }}
          >
            {emotion.icon}
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
