import React from "react"
import {
  Avatar,
  Box,
  Switch,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import theme from "../../theme"
import avatarImage from "../../assets/avatars/avatar_34.svg"
import avatarIcon31 from "../../assets/avatars/avatar_31.svg"
import avatarIcon32 from "../../assets/avatars/avatar_32.svg"
import avatarIcon33 from "../../assets/avatars/avatar_33.svg"
import avatarIcon34 from "../../assets/avatars/avatar_34.svg"
import avatarIcon35 from "../../assets/avatars/avatar_35.svg"
const ProfileDesktop: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  // const handleNavigation = (path: string) => {
  //   navigate(path)
  // }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "grid",
        gridTemplateColumns: "20vw 2px 28vw 28vw",
        gridTemplateRows: "repeat(10, 1fr)",
        margin: 0,
        padding: "10.5vh 12.5vw 12.5vh 14.38vw",
        gap: {
          sm: "1vw",
          md: "1.25vw",
        },
        backgroundColor: theme.colors.blackBackground,
      }}
    >
      <Avatar
        sx={{
          width: "10.81vw",
          height: "10.81vw",
          gridRow: "4 / 8",
          gridColumn: "1 / 2",
        }}
        src={avatarImage}
        alt="User Avatar"
      />

      {/* White line */}
      <Box
        sx={{
          height: "100%",
          width: "2px",
          backgroundColor: "white",
          gridRow: "1 / 11",
          gridColumn: "2 / 3",
        }}
      />

      {/* Editar Perfil */}
      <Typography
        sx={{
          gridRow: "1 / 2",
          gridColumn: "3 / 4",
          fontSize: "2rem",
          color: "white",
        }}
      >
        {t("/profile.account")}
      </Typography>
      <Box
        sx={{
          width: "100%",
          padding: "1em",
          height: "4rem",
          borderRadius: "0.75rem",
          display: "flex",
          justifyContent: "space-between",
          gridRow: "2 / 3",
          gridColumn: "3 / 4",
          backgroundColor: "white",
        }}
      >
        <Typography variant="body1">{t("/profile.account")}</Typography>
        <div
          style={{
            display: "flex",
            gap: "0.37rem",
          }}
        >
          <img src={avatarIcon31} style={{ width: "1.5rem", height: "1.5rem" }} />
          <img src={avatarIcon32} style={{ width: "1.5rem", height: "1.5rem" }} />
          <img src={avatarIcon33} style={{ width: "1.5rem", height: "1.5rem" }} />
          <img src={avatarIcon34} style={{ width: "1.5rem", height: "1.5rem" }} />
          <img src={avatarIcon35} style={{ width: "1.5rem", height: "1.5rem" }} />
        </div>
      </Box>
      <Box
        sx={{
          width: "100%",
          color: "black",
          backgroundColor: "white",
          borderRadius: "0.75rem",
          textTransform: "none",
          padding: "1em",
          height: "4rem",
          justifyContent: "space-between",
          gridRow: "3 / 4",
          gridColumn: "3 / 4",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="body1">{t("/profile.notifications")}</Typography>
        <Switch
          defaultChecked
          sx={{
            width: "3.25rem",
            height: "2rem",
            padding: 0,
            borderRadius: "1rem",
            "& .MuiSwitch-switchBase": {
              color: "white",
              "&.Mui-checked": {
                color: "white",
                "& + .MuiSwitch-track": {
                  backgroundColor: theme.colors.lightBlue,
                },
              },
            },
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          color: "black",
          backgroundColor: "white",
          borderRadius: "0.75rem",
          textTransform: "none",
          padding: "1em",
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gridRow: "4 / 5",
          gridColumn: "3 / 4",
        }}
      >
        <Typography variant="body1">{t("/profile.personification")}</Typography>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <div style={{ width: "1.5rem", height: "1.5rem", backgroundColor: theme.colors.lightBlue, borderRadius: "50%" }} />
          <div style={{ width: "1.5rem", height: "1.5rem", backgroundColor: theme.colors.green, borderRadius: "50%" }} />
          <div style={{ width: "1.5rem", height: "1.5rem", backgroundColor: theme.colors.pink, borderRadius: "50%" }} />
          <div style={{ width: "1.5rem", height: "1.5rem", backgroundColor: theme.colors.orange, borderRadius: "50%" }} />
          <div style={{ width: "1.5rem", height: "1.5rem", backgroundColor: theme.colors.yellow, borderRadius: "50%" }} />
        </div>
      </Box>

      {/* Configuración */}
      <Typography
        sx={{
          gridRow: "6 / 7",
          gridColumn: "3 / 4",
          fontSize: "2rem",
          color: "white",
        }}
      >
        {t("/profile.configuration")}
      </Typography>
      <Box
        sx={{
          width: "100%",
          color: "black",
          backgroundColor: "white",
          borderRadius: "0.75rem",
          textTransform: "none",
          padding: "1em",
          height: "4rem",
          gridRow: "7 / 8",
          gridColumn: "3 / 4",
        }}
      >
        <FormControl
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            color: "black",
            backgroundColor: "white",
          }}
        >
          <FormLabel id="demo-row-radio-buttons-group-label">{t("/profile.mode")}</FormLabel>
          <RadioGroup
            aria-labelledby="ddemo-row-radio-buttons-group-label"
            defaultValue={t("/profile.mode")}
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value={t("/profile.dark")}
              control={<Radio />}
              label={t("/profile.dark")}
            />
            <FormControlLabel
              value={t("/profile.light")}
              control={<Radio />}
              label={t("/profile.light")}
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box
        sx={{
          width: "100%",
          color: "black",
          backgroundColor: "white",
          borderRadius: "0.75rem",
          textTransform: "none",
          padding: "1em",
          height: "4rem",
          justifyContent: "space-between",
          gridRow: "8 / 9",
          gridColumn: "3 / 4",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="body1">{t("/profile.appSounds")}</Typography>
        <Switch
          defaultChecked
          sx={{
            width: "3.25rem",
            height: "2rem",
            padding: 0,
            borderRadius: "1rem",
            "& .MuiSwitch-switchBase": {
              color: "white",
              "&.Mui-checked": {
                color: "white",
                "& + .MuiSwitch-track": {
                  backgroundColor: theme.colors.lightBlue,
                },
              },
            },
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          color: "black",
          backgroundColor: "white",
          borderRadius: "0.75rem",
          textTransform: "none",
          padding: "1em",
          height: "4rem",
          gridRow: "9 / 10",
          gridColumn: "3 / 4",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FormControl
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            color: "black",
            backgroundColor: "white",
            fontSize: "1rem",
          }}
        >
          <FormLabel id="demo-row-radio-buttons-group-label">{t("/profile.fontsize")}</FormLabel>
          <RadioGroup
            aria-labelledby="ddemo-row-radio-buttons-group-label"
            defaultValue={t("/profile.fontsize")}
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value={t("/profile.small")}
              control={<Radio />}
              label={t("/profile.small")}
              sx={{
                color: "black",
                fontSize: "0.69rem",
                "&.Mui-checked": { color: "black" },
              }}
            />
            <FormControlLabel
              value={t("/profile.large")}
              control={<Radio />}
              label={t("/profile.large")}
              sx={{
                color: "black",
                fontSize: "0.69rem",
                "&.Mui-checked": { color: "black" },
              }}
            />
          </RadioGroup>
        </FormControl>
      </Box>

      {/* Mis interacciones */}
      <Typography
        sx={{
          gridRow: "1 / 2",
          gridColumn: "4 / 5",
          fontSize: "2rem",
          color: "white",
        }}
      >
        {t("/profile.interactions")}
      </Typography>
      <Box
        sx={{
          width: "100%",
          color: "black",
          backgroundColor: "white",
          borderRadius: "0.75rem",
          textTransform: "none",
          padding: "1em",
          height: "4rem",
          justifyContent: "space-between",
          gridRow: "2 / 3",
          gridColumn: "4 / 5",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="body1">{t("/profile.saveHistory")}</Typography>
        <Switch
          defaultChecked
          sx={{
            width: "3.25rem",
            height: "2rem",
            padding: 0,
            borderRadius: "1rem",
            "& .MuiSwitch-switchBase": {
              color: "white",
              "&.Mui-checked": {
                color: "white",
                "& + .MuiSwitch-track": {
                  backgroundColor: theme.colors.lightBlue,
                },
              },
            },
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          color: "black",
          backgroundColor: "white",
          borderRadius: "0.75rem",
          textTransform: "none",
          padding: "1em",
          height: "4rem",
          justifyContent: "space-between",
          gridRow: "3 / 4",
          gridColumn: "4 / 5",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="body1">{t("/profile.hideStatus")}</Typography>
        <Switch
          defaultChecked
          sx={{
            width: "3.25rem",
            height: "2rem",
            padding: 0,
            borderRadius: "1rem",
            "& .MuiSwitch-switchBase": {
              color: "white",
              "&.Mui-checked": {
                color: "white",
                "& + .MuiSwitch-track": {
                  backgroundColor: theme.colors.lightBlue,
                },
              },
            },
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          color: "black",
          backgroundColor: "white",
          borderRadius: "0.75rem",
          textTransform: "none",
          padding: "1em",
          height: "4rem",
          gridRow: "4 / 5",
          gridColumn: "4 / 5",
        }}
      >
        <FormControl
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            color: "black",
            backgroundColor: "white",
          }}
        >
          <FormLabel id="demo-row-radio-buttons-group-label">{t("/profile.mute")}</FormLabel>
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            defaultValue={t("/profile.mute")}
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="1h"
              control={<Radio />}
              label="1h"
              sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
            />
            <FormControlLabel
              value="24h"
              control={<Radio />}
              label="24h"
              sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  )
}

export default ProfileDesktop
