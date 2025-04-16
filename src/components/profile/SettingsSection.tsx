import { Box, Typography } from "@mui/material"
import { useScreenSize } from "../../hooks/useScreenSize"
import theme from "../../theme"
import { useTranslation } from "react-i18next"

interface SettingsSectionProps {
  title: string
  children: React.ReactNode
  gridRow?: {
    lg: string
    sm: string
  }
  gridColumn?: {
    lg: string
    sm: string
  }
}

export default function SettingsSection({ title, children, gridRow, gridColumn }: SettingsSectionProps) {
  const screenSize = useScreenSize()
  const { t } = useTranslation()

  if (screenSize === "sm") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: 0,
          padding: "6em 1em",
          gap: "1.25rem",
          backgroundColor: theme.colors.blackBackground,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {children}
        </Box>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        gridRow: gridRow,
        gridColumn: gridColumn,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1em",
      }}
    >
      <Typography
        sx={{
          fontSize: "2rem",
          color: "white",
          minHeight: "4rem",
        }}
      >
        {t(title)}
      </Typography>
      {children}
    </Box>
  )
} 