import { Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
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
import { useSettings } from "../../hooks/useSettings"

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
  const { settings, updateSetting } = useSettings()
  const [selectedAvatar, setSelectedAvatar] = useState<number>(34)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

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
          {Object.entries(AVATAR_IMAGES).map(([id, avatar]) => (
            <button
              type="button"
              key={id}
              style={{
                padding: 0,
                border: selectedAvatar === Number.parseInt(id, 10) ? `4px solid ${theme.colors.blackBackground}` : "none",
                borderRadius: "50%",
                background: "none",
                cursor: "pointer",
                width: selectedAvatar === Number.parseInt(id, 10) ? "2rem" : "1.5rem",
                height: selectedAvatar === Number.parseInt(id, 10) ? "2rem" : "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => setSelectedAvatar(Number.parseInt(id, 10))}
            >
              <img
                src={avatar}
                style={{
                  width: selectedAvatar === Number.parseInt(id, 10) ? "1.5rem" : "1.5rem",
                  height: selectedAvatar === Number.parseInt(id, 10) ? "1.5rem" : "1.5rem",
                  display: "block",
                }}
                alt={`Avatar ${id}`}
              />
            </button>
          ))}
        </div>
      </CommonBox>

      <CommonBox sx={{ justifyContent: "space-between" }}>
        <Typography variant="body1">{t("/profile.notifications")}</Typography>
        <CommonSwitch 
          checked={settings.notifications}
          onChange={(e) => updateSetting("notifications", e.target.checked)}
        />
      </CommonBox>

      <CommonBox sx={{ justifyContent: "space-between" }}>
        <Typography variant="body1">{t("/profile.personification")}</Typography>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {[
            { name: "lightBlue", color: theme.colors.lightBlue },
            { name: "green", color: theme.colors.green },
            { name: "pink", color: theme.colors.pink },
            { name: "orange", color: theme.colors.orange },
            { name: "yellow", color: theme.colors.yellow },
          ].map(({ name, color }) => (
            <button
              type="button"
              key={name}
              style={{
                padding: 0,
                border: selectedColor === name ? `4px solid ${theme.colors.blackBackground}` : "none",
                borderRadius: "50%",
                background: "none",
                cursor: "pointer",
                width: selectedColor === name ? "2rem" : "1.5rem",
                height: selectedColor === name ? "2rem" : "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => setSelectedColor(selectedColor === name ? null : name)}
            >
              <div
                style={{
                  width: selectedColor === name ? "1.5rem" : "1.5rem",
                  height: selectedColor === name ? "1.5rem" : "1.5rem",
                  backgroundColor: color,
                  borderRadius: "50%",
                }}
              />
            </button>
          ))}
        </div>
      </CommonBox>
    </SettingsSection>
  )
} 