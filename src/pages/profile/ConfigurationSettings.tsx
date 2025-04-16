import { Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import { useTranslation } from "react-i18next"
import SettingsSection from "../../components/profile/SettingsSection"
import CommonBox from "../../commons/CommonBox"
import CommonSwitch from "../../commons/CommonSwitch"
import theme from "../../theme"
import { useSettingsStore } from "../../store/useSettingsStore"

export default function ConfigurationSettings() {
  const { t } = useTranslation()
  const { settings, updateSetting } = useSettingsStore()

  return (
    <SettingsSection title="/profile.configuration" gridRow={{ lg: "6 / 10", sm: "8 / 12" }} gridColumn={{ lg: "4 / 8", sm: "1 / 13" }}>
      <CommonBox>
        <FormControl
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            color: "black",
            backgroundColor: "white",
          }}
        >
          <FormLabel id="mode-radio-group-label" sx={{ margin: 0, color: "black", fontWeight: "bold" }}>{t("/profile.mode")}</FormLabel>
          <RadioGroup
            aria-labelledby="mode-radio-group-label"
            value={settings.mode}
            onChange={(e) => updateSetting("mode", e.target.value as "dark" | "light")}
            name="mode-radio-group"
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value="dark"
              control={<Radio sx={{
                color: "black",
                '&.Mui-checked': {
                  color: theme.colors.lightBlue,
                },
              }} />}
              label={t("/profile.dark")}
              sx={{ margin: 0 }}
            />
            <FormControlLabel
              value="light"
              control={<Radio sx={{
                color: "black",
                '&.Mui-checked': {
                  color: theme.colors.lightBlue,
                },
              }} />}
              label={t("/profile.light")}
              sx={{ margin: 0 }}
            />
          </RadioGroup>
        </FormControl>
      </CommonBox>

      <CommonBox sx={{ justifyContent: "space-between" }}>
        <Typography variant="body1" fontWeight="bold">{t("/profile.appSounds")}</Typography>
        <CommonSwitch 
          checked={settings.appSounds}
          onChange={(e) => updateSetting("appSounds", e.target.checked)}
        />
      </CommonBox>

      <CommonBox>
        <FormControl
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            color: "black",
            backgroundColor: "white",
          }}
        >
          <FormLabel id="fontsize-radio-group-label" sx={{ margin: 0, color: "black", fontWeight: "bold" }}>{t("/profile.fontsize")}</FormLabel>
          <RadioGroup
            aria-labelledby="fontsize-radio-group-label"
            value={settings.fontSize}
            onChange={(e) => updateSetting("fontSize", e.target.value as "small" | "large")}
            name="fontsize-radio-group"
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value="small"
              control={<Radio sx={{
                color: "black",
                '&.Mui-checked': {
                  color: theme.colors.lightBlue,
                },
              }} />}
              label={t("/profile.small")}
              sx={{ margin: 0 }}
            />
            <FormControlLabel
              value="large"
              control={<Radio sx={{
                color: "black",
                '&.Mui-checked': {
                  color: theme.colors.lightBlue,
                },
              }} />}
              label={t("/profile.large")}
              sx={{ margin: 0 }}
            />
          </RadioGroup>
        </FormControl>
      </CommonBox>
    </SettingsSection>
  )
} 