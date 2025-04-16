import { Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import SettingsSection from "../../components/profile/SettingsSection"
import CommonBox from "../../commons/CommonBox"
import CommonSwitch from "../../commons/CommonSwitch"
import theme from "../../theme"
import avatarIcon31 from "../../assets/avatars/avatar_31.svg"
import avatarIcon32 from "../../assets/avatars/avatar_32.svg"
import avatarIcon33 from "../../assets/avatars/avatar_33.svg"
import avatarIcon34 from "../../assets/avatars/avatar_34.svg"
import avatarIcon35 from "../../assets/avatars/avatar_35.svg"
import { useScreenSize } from "../../hooks/useScreenSize"

const AVATAR_IMAGES = {
  31: avatarIcon31,
  32: avatarIcon32,
  33: avatarIcon33,
  34: avatarIcon34,
  35: avatarIcon35,
}

export default function AccountSettings() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const screenSize = useScreenSize()

  useEffect(() => {
    if (screenSize !== "sm") {
      navigate("/profile")
    }
  }, [screenSize, navigate])

  if (screenSize !== "sm") {
    return null
  }

  return (
    <SettingsSection title="/profile.account">
      <CommonBox sx={{ justifyContent: "space-between" }}>
        <Typography variant="body1">{t("/profile.account")}</Typography>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {Object.values(AVATAR_IMAGES).map((avatar) => (
            <img key={avatar} src={avatar} style={{ width: "1.5rem", height: "1.5rem" }} alt={`Avatar ${avatar}`} />
          ))}
        </div>
      </CommonBox>

      <CommonBox sx={{ justifyContent: "space-between" }}>
        <Typography variant="body1">{t("/profile.notifications")}</Typography>
        <CommonSwitch defaultChecked />
      </CommonBox>

      <CommonBox sx={{ justifyContent: "space-between" }}>
        <Typography variant="body1">{t("/profile.personification")}</Typography>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <div style={{ width: "1.5rem", height: "1.5rem", backgroundColor: theme.colors.lightBlue, borderRadius: "50%" }} />
          <div style={{ width: "1.5rem", height: "1.5rem", backgroundColor: theme.colors.green, borderRadius: "50%" }} />
          <div style={{ width: "1.5rem", height: "1.5rem", backgroundColor: theme.colors.pink, borderRadius: "50%" }} />
          <div style={{ width: "1.5rem", height: "1.5rem", backgroundColor: theme.colors.orange, borderRadius: "50%" }} />
          <div style={{ width: "1.5rem", height: "1.5rem", backgroundColor: theme.colors.yellow, borderRadius: "50%" }} />
        </div>
      </CommonBox>
    </SettingsSection>
  )
} 