import { Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import SettingsSection from "../../components/profile/SettingsSection"
import CommonBox from "../../commons/CommonBox"
import CommonSwitch from "../../commons/CommonSwitch"
import theme from "../../theme"
import avatarIcon31 from "../../assets/avatars/avatar_31.svg"
import avatarIcon32 from "../../assets/avatars/avatar_32.svg"
import avatarIcon33 from "../../assets/avatars/avatar_33.svg"
import avatarIcon34 from "../../assets/avatars/avatar_34.svg"
import avatarIcon35 from "../../assets/avatars/avatar_35.svg"
import { useSettingsStore } from "../../store/useSettingsStore"

const AVATAR_IMAGES = {
  31: avatarIcon31,
  32: avatarIcon32,
  33: avatarIcon33,
  34: avatarIcon34,
  35: avatarIcon35,
}

export default function AccountSettings() {
  const { t } = useTranslation()
  const { settings, updateSetting } = useSettingsStore()

  return (
    <SettingsSection title="/profile.account" gridRow={{ lg: "1 / 5", sm: "4 / 8"}} gridColumn={{ lg: "4 / 8", sm: "1 / 13" }}>
      <CommonBox sx={{ justifyContent: "space-between" }}>
        <Typography variant="body1" fontWeight="bold">{t("/profile.account")}</Typography>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {Object.entries(AVATAR_IMAGES).map(([id, avatar]) => (
            <button
              type="button"
              key={id}
              style={{
                padding: 0,
                border: settings.avatar === Number.parseInt(id, 10) ? `4px solid ${theme.colors.blackBackground}` : "none",
                borderRadius: "50%",
                background: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => updateSetting("avatar", Number.parseInt(id, 10))}
            >
              <img
                src={avatar}
                style={{
                  width: settings.avatar === Number.parseInt(id, 10) ? "2rem" : "1.5rem",
                  height: settings.avatar === Number.parseInt(id, 10) ? "2rem" : "1.5rem",
                  display: "block",
                }}
                alt={`Avatar ${id}`}
              />
            </button>
          ))}
        </div>
      </CommonBox>

      <CommonBox sx={{ justifyContent: "space-between" }}>
        <Typography variant="body1" fontWeight="bold">{t("/profile.notifications")}</Typography>
        <CommonSwitch 
          checked={settings.notifications}
          onChange={(e) => updateSetting("notifications", e.target.checked)}
        />
      </CommonBox>

      <CommonBox sx={{ justifyContent: "space-between" }}>
        <Typography variant="body1" fontWeight="bold" width="40%" >{t("/profile.customization")}</Typography>
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
                border: settings.customization === name ? `4px solid ${theme.colors.blackBackground}` : "none",
                borderRadius: "50%",
                background: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => updateSetting("customization", name)}
            >
              <div
                style={{
                  width: settings.customization === name ? "2rem" : "1.5rem",
                  height: settings.customization === name ? "2rem" : "1.5rem",
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