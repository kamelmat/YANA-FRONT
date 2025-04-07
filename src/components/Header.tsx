import { Box, IconButton, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "@emotion/styled"
import { useScreenSize } from "../hooks/useScreenSize"
import { useUserStore } from "../store/useUserStore"
import { getFormattedDate } from "../utils/getFormattedDate"
import { useTranslation } from "react-i18next"

import Logo from "../assets/branding/yana.svg"
import Slogan_ES from "../assets/branding/slogan_es.svg"
import Slogan_EN from "../assets/branding/slogan_en.svg"
import NotificationsIcon from "../assets/icons/notifications.svg"
import HamburgerIcon from "../assets/icons/hamburger.svg"
import BackIcon from "../assets/icons/back.svg"
import ProfileIcon from "../assets/icons/profile.svg"

import theme from "../theme"

import "@fontsource/league-spartan"

const CustomIconButton = styled(IconButton)(() => ({
  transition: "transform 0.2s ease-in-out",
  padding: "0 !important",
  "&:hover": {
    transform: "scale(1.15)",
  },
}))

export default function Header() {
  const screenSize = useScreenSize()
  const { username } = useUserStore()
  const date = getFormattedDate()
  const location = useLocation().pathname
  const navigate = useNavigate()
  const { t } = useTranslation()

  const iconSize = screenSize === "sm" ? "21px" : screenSize === "md" ? "35px" : "2.5vh"

  if (location === "/login" || location === "/register") return

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "8vh",
        backgroundColor: theme.colors.blackBackground,
        padding: "0 20px",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        {screenSize !== "sm" && (
          <>
            <img
              src={Logo}
              alt="Logo"
              style={{ height: "4.5vh", cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
            {screenSize === "lg" && <img src={navigator.language.includes("es") ? Slogan_ES : Slogan_EN} alt="Slogan" style={{ height: "4.5vh" }} />}
          </>
        )}
        {screenSize === "sm" && (
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {location === "/" && (
              <>
                <Typography
                  variant="h6"
                  fontSize={18}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    lineHeight: 1,
                    fontFamily: "League Spartan",
                  }}
                >
                  {t("header.welcome", { name: username })}
                </Typography>
                <Typography fontSize={14} sx={{ color: "white", lineHeight: 1, fontFamily: "League Spartan" }}>
                  {date}
                </Typography>
              </>
            )}
            {location !== "/" && (
              <CustomIconButton onClick={() => navigate(-1)}>
                <img src={BackIcon} alt="Back" style={{ height: iconSize }} />
              </CustomIconButton>
            )}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        {location !== "/"  && 
          <Typography variant="h5" sx={{ color: "white" }}>
            {t(`${location}.title`)}
          </Typography>
        }
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <CustomIconButton>
          <img src={NotificationsIcon} alt="Notifications" style={{ height: iconSize }} />
        </CustomIconButton>
        {screenSize === "sm" && (
          <CustomIconButton>
            <img src={HamburgerIcon} alt="Hamburger" style={{ height: iconSize }} />
          </CustomIconButton>
        )}
        {screenSize !== "sm" && (
          <CustomIconButton onClick={() => navigate("/profile")}>
            <img src={ProfileIcon} alt="Profile" style={{ height: iconSize }} />
          </CustomIconButton>
        )}
      </Box>
    </Box>
  )
}
