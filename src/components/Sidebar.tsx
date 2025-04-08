import React from "react"
import { Paper, List, ListItem, ListItemText } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { useScreenSize } from "../hooks/useScreenSize"
import { useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

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
  color: "#fff",
  padding: `12px ${PADDING_X}`,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  transition: "all 0.3s ease",
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
      selectedColor: "white",
      route: "/settings",
    },
    {
      icon: <ExitIcon width={ICON_SIZE} height={ICON_SIZE} />,
      selectedColor: "white",
      route: "/login",
    },
  ]

  if (screenSize === "sm" || location.pathname === "/login" || location.pathname === "/register") return null

  const handleItemClick = (route: string) => {
    navigate(route)
  }

  return (
    <Paper
      component="nav"
      sx={{
        position: "fixed",
        top: 0,
        left: `calc(${-WIDTH}px + ${PADDING_X} * 2 + ${ICON_SIZE})`,
        bottom: 0,
        width: WIDTH + "px",
        backgroundColor: theme.colors.blackBackground,
        zIndex: 900,
        paddingTop: "15vh",
        borderRadius: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "left 0.3s ease",
        "&:hover": {
          left: 0,
        },
      }}
    >
      <List>
        {navItems.slice(0, 4).map((item) => (
          <StyledListItem
            key={t(`${item.route}.menu` + 'sb')}
            selected={location.pathname === item.route}
            selectedColor={item.selectedColor}
            onClick={() => handleItemClick(item.route)}
          >
            <ListItemText primary={t(`${item.route}.menu`)} />
            {item.icon}
          </StyledListItem>
        ))}
      </List>
      <List>
        {navItems.slice(4).map((item) => (
          <StyledListItem
            key={t(`${item.route}.menu` + 'sb')}
            selected={location.pathname === item.route}
            selectedColor={item.selectedColor}
            onClick={() => handleItemClick(item.route)}
          >
            <ListItemText primary={t(`${item.route !== "/login" ? item.route : "exit"}.menu`)} />
            {item.icon}
          </StyledListItem>
        ))}
      </List>
    </Paper>
  )
}

export default React.memo(Sidebar)
