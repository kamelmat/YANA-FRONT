import React from "react"
import { Paper, List, ListItem, ListItemText } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { useScreenSize } from "../hooks/useScreenSize"
import { useLocation, useNavigate } from "react-router-dom"

import HomeIcon from "../assets/icons/roofing.svg?react"
import ResourcesIcon from "../assets/icons/loupe.svg?react"
import ContactsIcon from "../assets/icons/people_outline.svg?react"
import FAQIcon from "../assets/icons/faq.svg?react"
import SettingsIcon from "../assets/icons/settings.svg?react"
import ExitIcon from "../assets/icons/exit.svg?react"

import styled from "@emotion/styled"

const ICON_SIZE = 30;
const WIDTH = 250;
const PADDING_X = 24;

interface NavItem {
  label: string
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
  color: '#fff',
  padding: `12px ${PADDING_X}px`,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  transition: "all 0.3s ease",
  "& svg": {
    "& path": {
      fill: selected ? selectedColor : '#ffffff',
      transition: "all 0.3s ease",
    },
  },
  "&:hover svg": {
    "& path": {
      transition: "all 0.3s ease",
      fill: selectedColor,
    },
  }
}))

const Sidebar: React.FC = () => {
  const theme = useTheme()
  const screenSize = useScreenSize()
  const navigate = useNavigate()
  const location = useLocation()

  const navItems: NavItem[] = [
    {
      label: "Home",
      icon: <HomeIcon width={ICON_SIZE} height={ICON_SIZE} />,
      selectedColor: theme.colors.pink,
      route: "/",
    },
    {
      label: "Recursos",
      icon: <ResourcesIcon width={ICON_SIZE} height={ICON_SIZE} />,
      selectedColor: theme.colors.lightBlue,
      route: "/resources",
    },
    {
      label: "Contactos",
      icon: <ContactsIcon width={ICON_SIZE} height={ICON_SIZE} />,
      selectedColor: theme.colors.yellow,
      route: "/contacts",
    },
    {
      label: "FAQ",
      icon: <FAQIcon width={ICON_SIZE} height={ICON_SIZE} />,
      selectedColor: theme.colors.green,
      route: "/FAQ",
    },
    {
      label: "Configuración",
      icon: <SettingsIcon width={ICON_SIZE} height={ICON_SIZE} />,
      selectedColor:  "white",
      route: "/settings",
    },
    {
      label: "Exit",
      icon: <ExitIcon width={ICON_SIZE} height={ICON_SIZE} />,
      selectedColor: "white",
      route: "/login",
    },
  ]

  if (screenSize === "sm" || location.pathname === "/login") return null

  const handleItemClick = (route: string) => {
    navigate(route)
  }

  return (
    <Paper
      component="nav"
      sx={{
        position: "fixed",
        top: 0,
        left: -WIDTH + PADDING_X * 2 + ICON_SIZE + 'px',
        bottom: 0,
        width: WIDTH + 'px',
        backgroundColor: theme.colors.blackBackground,
        zIndex: theme.zIndex.appBar,
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
            key={item.label}
            selected={location.pathname === item.route}
            selectedColor={item.selectedColor}
            onClick={() => handleItemClick(item.route)}
          >
            <ListItemText primary={item.label} />
            {item.icon}
          </StyledListItem>
        ))}
      </List>
      <List>
        {navItems.slice(4).map((item) => (
          <StyledListItem
            key={item.label}
            selected={location.pathname === item.route}
            selectedColor={item.selectedColor}
            onClick={() => handleItemClick(item.route)}
          >
            <ListItemText primary={item.label} />
            {item.icon}
          </StyledListItem>
        ))}
      </List>
    </Paper>
  )
}

export default React.memo(Sidebar)
