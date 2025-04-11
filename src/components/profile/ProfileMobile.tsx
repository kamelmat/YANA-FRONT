import React from "react"
import { Avatar, Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useScreenSize } from "../../hooks/useScreenSize"
import { useTranslation } from "react-i18next"
import theme from "../../theme"
import avatarImage from "../../assets/avatars/avatar_34.svg"
import accountIcon from "../../assets/icons/account_circle.svg"
import intaractionsIcon from "../../assets/icons/groups.svg"
import configurationIcon from "../../assets/icons/settings2.svg"
import logoutIcon from "../../assets/icons/logout_blue.svg"
import helpIcon from "../../assets/icons/emergency.svg"

const ProfileMobile: React.FC = () => {
  const navigate = useNavigate()
  const screenSize = useScreenSize()
  const { t } = useTranslation()

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
        padding: "8.94rem 1rem 20vw 1rem",
        gap: "1.25rem",
        backgroundColor: theme.colors.blackBackground,
      }}
    >
      <Avatar
        sx={{
          width: "10.81rem",
          height: "10.81rem",
          marginBottom: "3.44rem",
        }}
        src={avatarImage}
        alt="User Avatar"
      />
      <Button
        variant="contained"
        fullWidth
        sx={{
          color: "black",
          backgroundColor: "white",
          borderRadius: "0.75rem",
          textTransform: "none",
          padding: "1em",
          height: "4rem",
          justifyContent: "space-between",
        }}
        onClick={() => handleNavigation("/profile/account")}
      >
        <Typography variant="body1">{t("/profile.account")}</Typography>
        <img src={accountIcon} alt={t("/profile.account")} />
      </Button>
      <Button
        variant="contained"
        fullWidth
        sx={{
          color: "black",
          backgroundColor: "white",
          borderRadius: "0.75rem",
          textTransform: "none",
          padding: "1em",
          height: "4rem",
          justifyContent: "space-between",
        }}
        onClick={() => handleNavigation("/profile/intaractions")}
      >
        <Typography variant="body1">{t("/profile.interactions")}</Typography>
        <img src={intaractionsIcon} alt={t("/profile.interactions")} />
      </Button>
      <Button
        variant="contained"
        fullWidth
        sx={{
          color: "black",
          backgroundColor: "white",
          borderRadius: "0.75rem",
          textTransform: "none",
          padding: "1em",
          height: "4rem",
          justifyContent: "space-between",
        }}
        onClick={() => handleNavigation("/profile/configuration")}
      >
        <Typography variant="body1">{t("/profile.configuration")}</Typography>
        <img src={configurationIcon} alt={t("/profile.configuration")} />
      </Button>
      <Button
        variant="contained"
        fullWidth
        sx={{
          color: "black",
          backgroundColor: "white",
          borderRadius: "0.75rem",
          textTransform: "none",
          padding: "1em",
          height: "4rem",
          justifyContent: "space-between",
        }}
        onClick={() => handleNavigation("/profile/help")}
      >
        <Typography variant="body1">{t("/profile.help")}</Typography>
        <img src={helpIcon} alt={t("/profile.help")} />
      </Button>
      <Button
        variant="contained"
        fullWidth
        sx={{
          color: theme.colors.lightBlue,
          backgroundColor: theme.colors.blackBackground,
          borderRadius: "0.75rem",
          textTransform: "none",
          padding: "1em",
          height: "4rem",
          justifyContent: "space-between",
          border: `2px solid ${theme.colors.lightBlue}`,
        }}
        onClick={() => handleNavigation("/profile/logout")}
      >
        <Typography variant="body1">{t("/profile.logout")}</Typography>
        <img src={logoutIcon} alt={t("/profile.logout")} />
      </Button>
    </Box>
  )
}

export default ProfileMobile
