import { Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import SettingsSection from "../../components/profile/SettingsSection"
import CommonBox from "../../commons/CommonBox"
import CommonSwitch from "../../commons/CommonSwitch"
import { useScreenSize } from "../../hooks/useScreenSize"

export default function ConfigurationSettings() {
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
    <SettingsSection title="/profile.configuration">
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
          <FormLabel id="mode-radio-group-label" sx={{ margin: 0, color: "black" }}>{t("/profile.mode")}</FormLabel>
          <RadioGroup
            aria-labelledby="mode-radio-group-label"
            defaultValue="dark"
            name="mode-radio-group"
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value="dark"
              control={<Radio />}
              label={t("/profile.dark")}
              sx={{ margin: 0 }}
            />
            <FormControlLabel
              value="light"
              control={<Radio />}
              label={t("/profile.light")}
              sx={{ margin: 0 }}
            />
          </RadioGroup>
        </FormControl>
      </CommonBox>

      <CommonBox sx={{ justifyContent: "space-between" }}>
        <Typography variant="body1">{t("/profile.appSounds")}</Typography>
        <CommonSwitch defaultChecked />
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
          <FormLabel id="fontsize-radio-group-label" sx={{ margin: 0, color: "black" }}>{t("/profile.fontsize")}</FormLabel>
          <RadioGroup
            aria-labelledby="fontsize-radio-group-label"
            defaultValue="small"
            name="fontsize-radio-group"
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value="small"
              control={<Radio />}
              label={t("/profile.small")}
              sx={{ margin: 0 }}
            />
            <FormControlLabel
              value="large"
              control={<Radio />}
              label={t("/profile.large")}
              sx={{ margin: 0 }}
            />
          </RadioGroup>
        </FormControl>
      </CommonBox>
    </SettingsSection>
  )
} 