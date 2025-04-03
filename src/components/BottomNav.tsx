import React from "react"
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"
import { useTheme, Theme } from "@mui/material/styles"
import styled from "@emotion/styled"
import { useScreenSize } from "../hooks/useScreenSize"
import { useNavigate } from "react-router-dom"

import HomeIcon from "../assets/icons/roofing.svg?react"
import ResourcesIcon from "../assets/icons/loupe.svg?react"
import ContactsIcon from "../assets/icons/people_outline.svg?react"
import ProfileIcon from "../assets/icons/sentiment_satisfied_alt.svg?react"

interface NavItem {
  label: string
  icon: React.ReactNode
  selectedColor: string
  route: string
}

interface StyledNavActionProps {
  selected?: boolean
  selectedColor?: string
}

const StyledBottomNavAction = styled(BottomNavigationAction, {
  shouldForwardProp: (prop) => prop !== "selectedColor",
})<StyledNavActionProps>(({ selectedColor }) => ({
  minWidth: "auto",
  paddingBottom: "10px",
  color: "#ffffff",
  "&.Mui-selected": {
    color: selectedColor || "#ffffff",
    "& svg": {
      color: selectedColor || "#ffffff",
      "& path": {
        fill: selectedColor || "#ffffff",
      },
    },
  },
  "& .MuiBottomNavigationAction-label": {
    fontSize: "0.75rem",
    marginTop: "2px",
    "&.Mui-selected": {
      fontSize: "0.75rem",
    },
  },
  "& svg": {
    color: "#ffffff",
    "& path": {
      fill: "#ffffff",
    },
  },
  "&:hover": {
    background: "transparent",
  },
  "&:focus": {
    outline: "none",
  },
}))

const BottomNav: React.FC = () => {
  const theme = useTheme() as Theme
  const [value, setValue] = React.useState(0)
  const screenSize = useScreenSize()
  const navigate = useNavigate()

  const navItems: NavItem[] = [
    {
      label: "Home",
      icon: <HomeIcon width={24} height={24} />,
      selectedColor: theme.colors.pink,
      route: "/",
    },
    {
      label: "Recursos",
      icon: <ResourcesIcon width={24} height={24} />,
      selectedColor: theme.colors.lightBlue,
      route: "/resources",
    },
    {
      label: "Contactos",
      icon: <ContactsIcon width={24} height={24} />,
      selectedColor: theme.colors.yellow,
      route: "/contacts",
    },
    {
      label: "Perfil",
      icon: <ProfileIcon width={24} height={24} />,
      selectedColor: theme.colors.green,
      route: "/profile",
    },
  ]

  if (screenSize !== "sm") return

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    navigate(navItems[newValue].route)
  }

  return (
    <Paper
      component="nav"
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: `${theme.borders?.borderRadius} ${theme.borders?.borderRadius} 0 0`,
        height: "20vw",
        background: theme.gradients.gradientBlack,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        sx={{
          background: "transparent",
          height: "100%",
        }}
      >
        {navItems.map((item, index) => (
          <StyledBottomNavAction
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={value === index}
            selectedColor={item.selectedColor}
          />
        ))}
      </BottomNavigation>
    </Paper>
  )
}

export default React.memo(BottomNav)
