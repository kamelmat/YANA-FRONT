import { Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import SettingsSection from "../../components/profile/SettingsSection"
import CommonBox from "../../commons/CommonBox"
import CommonSwitch from "../../commons/CommonSwitch"
import { useScreenSize } from "../../hooks/useScreenSize"
import theme from "../../theme"

export default function InteractionsSettings() {
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
    <SettingsSection title="/profile.interactions">
      <CommonBox sx={{ justifyContent: "space-between" }}>
        <Typography variant="body1">{t("/profile.saveHistory")}</Typography>
        <CommonSwitch defaultChecked />
      </CommonBox>

      <CommonBox sx={{ justifyContent: "space-between" }}>
        <Typography variant="body1">{t("/profile.hideStatus")}</Typography>
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
          <FormLabel id="mute-radio-group-label" sx={{ margin: 0, color: "black" }}>{t("/profile.mute")}</FormLabel>
          <RadioGroup
            aria-labelledby="mute-radio-group-label"
            defaultValue={t("/profile.mute")}
            name="mute-radio-group"
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value="1h"
              control={<Radio sx={{ color: "black", "&.Mui-checked": { color: theme.colors.lightBlue } }} />}
              label="1h"
              sx={{ margin: 0, color: "black", "&.Mui-checked": { color: "black" } }}
            />
            <FormControlLabel
              value="24h"
              control={<Radio sx={{ color: "black", "&.Mui-checked": { color: theme.colors.lightBlue } }} />}
              label="24h"
              sx={{ margin: 0, color: "black", "&.Mui-checked": { color: "black" } }}
            />
          </RadioGroup>
        </FormControl>
      </CommonBox>
    </SettingsSection>
  )
} 