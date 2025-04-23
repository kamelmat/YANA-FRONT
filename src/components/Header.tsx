import styled from "@emotion/styled";
import { Box, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import useScreenSize from "../hooks/useScreenSize";
import { useAuthStore } from "../store/authStore";
import { getFormattedDate } from "../utils/getFormattedDate";

import Slogan_EN from "../assets/branding/slogan_en.svg?url";
import Slogan_ES from "../assets/branding/slogan_es.svg?url";
import Logo from "../assets/branding/yana.svg?url";
import BackIcon from "../assets/icons/back.svg?url";
import NotificationsIcon from "../assets/icons/notifications.svg?url";
import ProfileIcon from "../assets/icons/profile.svg?url";

import theme from "../theme";

import "@fontsource/league-spartan";
import HamburgerMenu from "./HamburgerMenu";

const CustomIconButton = styled(IconButton)(() => ({
  transition: "transform 0.2s ease-in-out",
  padding: "0 !important",
  "&:hover": {
    transform: "scale(1.15)",
  },
}));

export default function Header() {
  const screenSize = useScreenSize();
  const name = useAuthStore((state) => state.name);
  const date = getFormattedDate();
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const iconSize = screenSize === "sm" ? "21px" : screenSize === "md" ? "35px" : "2.5vh";
  const isDesktop = screenSize === "lg" || screenSize === "xl";

  if (
    location === "/login" ||
    location === "/register" ||
    location === "/onboarding" ||
    location.startsWith("/reset-password")
  )
    return;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "8vh",
        backgroundColor:
          screenSize === "sm" ? theme.colors.darkPurple : theme.colors.blackBackground,
        padding: "0 1.25rem",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
        {screenSize !== "sm" && (
          <>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: not needed */}
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "3rem", cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
            {isDesktop && (
              <img
                src={navigator.language.includes("es") ? Slogan_ES : Slogan_EN}
                alt="Slogan"
                style={{ height: "4.5vh" }}
              />
            )}
          </>
        )}
        {screenSize === "sm" && (
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {location === "/" && (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    lineHeight: 1,
                    fontFamily: "League Spartan",
                  }}
                >
                  {t("header.welcome", { name })}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "white", lineHeight: 1, fontFamily: "League Spartan" }}
                >
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
        {location !== "/" && location !== "/FAQ" && !isDesktop && (
          <Typography variant="h5" sx={{ color: "white" }}>
            {t(`${location}.title`)}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <CustomIconButton>
          <img src={NotificationsIcon} alt="Notifications" style={{ height: iconSize }} />
        </CustomIconButton>
        {screenSize === "sm" && <HamburgerMenu />}
        {screenSize !== "sm" && (
          <CustomIconButton onClick={() => navigate("/profile")}>
            <img src={ProfileIcon} alt="Profile" style={{ height: iconSize }} />
          </CustomIconButton>
        )}
      </Box>
    </Box>
  );
}
