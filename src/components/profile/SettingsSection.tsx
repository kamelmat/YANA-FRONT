import { Box } from "@mui/material"
import { useScreenSize } from "../../hooks/useScreenSize"
import theme from "../../theme"

interface SettingsSectionProps {
  title: string
  children: React.ReactNode
}

export default function SettingsSection({ children }: SettingsSectionProps) {
  const screenSize = useScreenSize()

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
          maxWidth: screenSize === "sm" ? "100%" : "600px",
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