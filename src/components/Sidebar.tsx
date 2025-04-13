import React from "react"
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { useScreenSize } from "../hooks/useScreenSize"
import { useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { useLogout } from "../hooks/useLogout"
import { useUserStore } from "../store/useUserStore"
import { getFormattedDate } from "../utils/getFormattedDate"


import HomeIcon from "../assets/icons/roofing.svg?react"
import ResourcesIcon from "../assets/icons/loupe.svg?react"
import ContactsIcon from "../assets/icons/people_outline.svg?react"
import FAQIcon from "../assets/icons/faq.svg?react"
import SettingsIcon from "../assets/icons/settings.svg?react"
import ExitIcon from "../assets/icons/exit.svg?react"

import styled from "@emotion/styled"

const ICON_SIZE = "2rem"
const WIDTH = 250
const PADDING_X = "1.75rem"

interface NavItem {
  icon: React.ReactNode
  selectedColor: string
  route: string
}

interface StyledListItemProps {
  selected?: boolean
  selectedColor?: string
}

const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "selectedColor",
})<StyledListItemProps>(({ selectedColor, selected }) => ({
  color: selected ? selectedColor : "#fff",
  padding: `12px ${PADDING_X}`,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  transition: "all 0.3s ease",
  "&:hover": {
    color: selectedColor,
  },
  "& svg": {
    "& path": {
      fill: selected ? selectedColor : "#ffffff",
      transition: "all 0.3s ease",
    },
  },
  "&:hover svg": {
    "& path": {
      transition: "all 0.3s ease",
      fill: selectedColor,
    },
  },
}))

const Sidebar: React.FC = () => {
  const theme = useTheme()
  const screenSize = useScreenSize()
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const { mutate: logout } = useLogout()
  const { username } = useUserStore()
  const date = getFormattedDate()

  const navItems: NavItem[] = [
    {
      icon: <HomeIcon width={ICON_SIZE} height={ICON_SIZE} />,
      selectedColor: theme.colors.pink,
      route: "/",
    },
    {
      icon: <ResourcesIcon width={ICON_SIZE} height={ICON_SIZE} />,
      selectedColor: theme.colors.lightBlue,
      route: "/resources",
    },
    {
      icon: <ContactsIcon width={ICON_SIZE} height={ICON_SIZE} />,
      selectedColor: theme.colors.yellow,
      route: "/contacts",
    },
    {
      icon: <FAQIcon width={ICON_SIZE} height={ICON_SIZE} />,
      selectedColor: theme.colors.green,
      route: "/FAQ",
    },
    {
      icon: <SettingsIcon width={ICON_SIZE} height={ICON_SIZE} />,
      selectedColor: theme.colors.pink,
      route: "/profile",
    },
    {
      icon: <ExitIcon width={ICON_SIZE} height={ICON_SIZE} />,
      route: "/logout",
      selectedColor: theme.colors.pink,
    },
  ]

  if (screenSize === "sm" || location.pathname === "/login" || location.pathname === "/register") return null

  const handleItemClick = (route: string) => {
    if (route === "/logout") {
      logout()
    } else {
      navigate(route)
    }
  }

  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        top: 0,
        left: `calc(${-WIDTH}px + ${PADDING_X} * 2 + ${ICON_SIZE})`,
        bottom: 0,
        width: WIDTH + "px",
        backgroundColor: theme.colors.blackBackground,
        zIndex: 900,
        borderRadius: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "left 0.3s ease, background-color 0.3s ease",
        "&:hover": {
          left: 0,
          background: `linear-gradient(to bottom, ${theme.colors.blackBackground}, ${theme.colors.darkPurple} 15%)`,
        },
      }}
    >
      <Box>
        <Box sx={{ paddingLeft: PADDING_X }}>
          <Typography
            variant="h6"
            fontSize={22}
            paddingTop="12vh"
            sx={{
              color: "white",
              fontWeight: "bold",
              lineHeight: 1,
              fontFamily: "League Spartan",
            }}
          >
            {t("header.welcome", { name: username })}
          </Typography>
          <Typography fontSize={18} sx={{ color: "white", fontFamily: "League Spartan" }}>
            {date}
          </Typography>
        </Box>
        <List>
          {navItems.slice(0, 4).map((item) => (
            <StyledListItem
              key={item.route}
              selected={location.pathname === item.route}
              selectedColor={item.selectedColor}
              onClick={() => handleItemClick(item.route)}
            >
              <ListItemText primary={t(`${item.route}.menu`)} />
              {item.icon}
            </StyledListItem>
          ))}
        </List>
      </Box>
      <List>
        {navItems.slice(4).map((item) => (
          <StyledListItem
            key={item.route}
            selected={location.pathname === item.route}
            selectedColor={item.selectedColor}
            onClick={() => handleItemClick(item.route)}
          >
            <ListItemText primary={t(`${item.route !== "/login" ? item.route : "exit"}.menu`)} />
            {item.icon}
          </StyledListItem>
        ))}
      </List>
    </Box>
  )
}

export default React.memo(Sidebar)
