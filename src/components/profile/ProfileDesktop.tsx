import type { FC } from "react"
import { useState } from "react"
import {
  Avatar,
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import theme from "../../theme"
import avatarIcon31 from "../../assets/avatars/avatar_31.svg"
import avatarIcon32 from "../../assets/avatars/avatar_32.svg"
import avatarIcon33 from "../../assets/avatars/avatar_33.svg"
import avatarIcon34 from "../../assets/avatars/avatar_34.svg"
import avatarIcon35 from "../../assets/avatars/avatar_35.svg"
import CustomButton from "../../commons/CommonButton"
import deleteIcon from "../../assets/icons/cancel.svg"
import CommonBox from "../../commons/CommonBox"
import CommonSwitch from "../../commons/CommonSwitch"
import { useScreenSize } from "../../hooks/useScreenSize"
import Modal from "../../commons/DeleteModal"
import { useDeleteAccount } from '../../hooks/useDeleteAccount';

// Constants
const AVATAR_IMAGES = {
  31: avatarIcon31,
  32: avatarIcon32,
  33: avatarIcon33,
  34: avatarIcon34,
  35: avatarIcon35,
}

const ProfileDesktop: FC = () => {
  const { t } = useTranslation()
  const screenSize = useScreenSize()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const deleteAccount = useDeleteAccount()

  const handleDeleteAccount = (password: string) => {
    deleteAccount.mutate(password, {
      onSuccess: () => {
        setIsDeleteModalOpen(false)
      },
      onError: (error) => {
        console.error('Error deleting account:', error)
      }
    })
  }

  return (
    <Box
      sx={{
        height: {
          lg: "100vh",
          md: "100%",
        },
        width: "100vw",
        display: "grid",
        gridTemplateRows: {
          lg: "repeat(12, 1fr)",
          md: "repeat(17, 1fr)",
        },
        gridTemplateColumns: "repeat(12, 1fr)",
        margin: 0,
        padding:{
          md: "8em",
          lg: "10em 20em"
        },
        gap: "1em",
        backgroundColor: theme.colors.blackBackground,
      }}
    >
      { screenSize === "lg" &&
        <Typography variant="h4"
          sx={{
            gridRow: 1,
            gridColumn: "1 / 3",
            justifySelf: "start",
            color: "white",
          }}
        >
          {t("/profile.title")}
        </Typography>
      }
      <Avatar
        sx={{
          gridRow: {
            lg: "4 / 7",
            md: "1 / 4"
          },
          gridColumn: {
            lg: "1 / 2",
            md: "1 / 13"
          },
          justifySelf: "center",
          width: "auto",
          height: "auto",
          aspectRatio: "1/1",
        }}
        src={AVATAR_IMAGES[34]}
        alt="User Avatar"
      />

      {/* White line */}
      <Box
        sx={{
          height: {
            lg: "100%",
            md: "1px"
          },
          width: {
            lg: "1px",
            md: "100%"
          },
          backgroundColor: "white",
          gridRow: {
            lg: "1 / 11",
            md: "4 / 5"
          },
          gridColumn: {
            lg: "3",
            md: "1 / 13"
          },
        }}
      />

      {/* Account Section */}
      <Typography
        sx={{
          gridRow: {
            lg: "1 / 2",
            md: "5 / 6"
          },
          gridColumn: {
            lg: "4 / 8",
            md: "1 / 13"
          },
          fontSize: "2rem",
          color: "white",
        }}
      >
        {t("/profile.account")}
      </Typography>
      <CommonBox
        sx={{
          justifyContent: "space-between",
          gridRow: {
            lg: "2 / 3",
            md: "6 / 7"
          },
          gridColumn: {
            lg: "4 / 8",
            md: "1 / 13"
          },
        }}
      >
        <Typography variant="body1">{t("/profile.account")}</Typography>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {Object.values(AVATAR_IMAGES).map((avatar) => (
            <img key={avatar} src={avatar} style={{ width: "1.5rem", height: "1.5rem" }} alt={`Avatar ${avatar}`} />
          ))}
        </div>
      </CommonBox>
      <CommonBox
        sx={{
          justifyContent: "space-between",
          gridRow: {
            lg: "3 / 4",
            md: "7 / 8"
          },
          gridColumn: {
            lg: "4 / 8",
            md: "1 / 13"
          },
        }}
      >
        <Typography variant="body1">{t("/profile.notifications")}</Typography>
        <CommonSwitch defaultChecked />
      </CommonBox>
      <CommonBox
        sx={{
          justifyContent: "space-between",
          gridRow: {
            lg: "4 / 5",
            md: "8 / 9"
          },
          gridColumn: {
            lg: "4 / 8",
            md: "1 / 13"
          },
        }}
      >
        <Typography variant="body1">{t("/profile.personification")}</Typography>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <div style={{ width: "1.5rem", height: "1.5rem", backgroundColor: theme.colors.lightBlue, borderRadius: "50%" }} />
          <div style={{ width: "1.5rem", height: "1.5rem", backgroundColor: theme.colors.green, borderRadius: "50%" }} />
          <div style={{ width: "1.5rem", height: "1.5rem", backgroundColor: theme.colors.pink, borderRadius: "50%" }} />
          <div style={{ width: "1.5rem", height: "1.5rem", backgroundColor: theme.colors.orange, borderRadius: "50%" }} />
          <div style={{ width: "1.5rem", height: "1.5rem", backgroundColor: theme.colors.yellow, borderRadius: "50%" }} />
        </div>
      </CommonBox>

      {/* Configuration Section */}
      <Typography
        sx={{
          gridRow: {
            lg: "6 / 7",
            md: "9 / 10"
          },
          gridColumn: {
            lg: "4 / 8",
            md: "1 / 13"
          },
          fontSize: "2rem",
          color: "white",
        }}
      >
        {t("/profile.configuration")}
      </Typography>
      <CommonBox
        sx={{
          gridRow: {
            lg: "7 / 8",
            md: "10 / 11"
          },
          gridColumn: {
            lg: "4 / 8",
            md: "1 / 13"
          },
        }}
      >
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
      <CommonBox
        sx={{
          justifyContent: "space-between",
          gridRow: {
            lg: "8 / 9",
            md: "11 / 12"
          },
          gridColumn: {
            lg: "4 / 8",
            md: "1 / 13"
          },
        }}
      >
        <Typography variant="body1">{t("/profile.appSounds")}</Typography>
        <CommonSwitch defaultChecked />
      </CommonBox>
      <CommonBox
        sx={{
          gridRow: {
            lg: "9 / 10",
            md: "12 / 13"
          },
          gridColumn: {
            lg: "4 / 8",
            md: "1 / 13"
          },
        }}
      >
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
            fontSize: "1rem",
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
              sx={{
                color: "black",
                fontSize: "0.69rem",
                margin: 0,
                "&.Mui-checked": { color: "black" },
              }}
            />
            <FormControlLabel
              value="large"
              control={<Radio />}
              label={t("/profile.large")}
              sx={{
                color: "black",
                fontSize: "0.69rem",
                margin: 0,
                "&.Mui-checked": { color: "black" },
              }}
            />
          </RadioGroup>
        </FormControl>
      </CommonBox>

      <CommonBox
        sx={{
          gridRow: {
            lg: "9 / 10",
            md: "18 / 19"
          },
          gridColumn: {
            lg: "9 / 13",
            md: "1 / 13"
          },
          backgroundColor: "transparent",
          padding: 0,
        }}
      >
        <CustomButton
          text={t("/profile.deleteAccount")}
          icon={<img src={deleteIcon} alt={t("/profile.deleteAccount")} />}
          iconPosition="end"
          variantType="ghost"
          onClick={() => setIsDeleteModalOpen(true)}
          sx={{ border: `3px solid ${theme.colors.lightPink}`, borderRadius: "0.75rem", height: "4rem" }}
        />
      </CommonBox>

      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onPasswordSubmit={handleDeleteAccount}
      />

      {/* Interactions Section */}
      <Typography
        sx={{
          gridRow: {
            lg: "1 / 2",
            md: "13 / 14"
          },
          gridColumn: {
            lg: "9 / 13",
            md: "1 / 13"
          },
          fontSize: "2rem",
          color: "white",
        }}
      >
        {t("/profile.interactions")}
      </Typography>
      <CommonBox
        sx={{
          justifyContent: "space-between",
          gridRow: {
            lg: "2 / 3",
            md: "14 / 15"
          },
          gridColumn: {
            lg: "9 / 13",
            md: "1 / 13"
          },
        }}
      >
        <Typography variant="body1">{t("/profile.saveHistory")}</Typography>
        <CommonSwitch defaultChecked />
      </CommonBox>
      <CommonBox
        sx={{
          justifyContent: "space-between",
          gridRow: {
            lg: "3 / 4",
            md: "15 / 16"
          },
          gridColumn: {
            lg: "9 / 13",
            md: "1 / 13"
          },
        }}
      >
        <Typography variant="body1">{t("/profile.hideStatus")}</Typography>
        <CommonSwitch defaultChecked />
      </CommonBox>
      <CommonBox
        sx={{
          gridRow: {
            lg: "4 / 5",
            md: "16 / 17"
          },
          gridColumn: {
            lg: "9 / 13",
            md: "1 / 13"
          },
        }}
      >
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
              control={<Radio />}
              label="1h"
              sx={{ margin: 0, color: "black", "&.Mui-checked": { color: "black" } }}
            />
            <FormControlLabel
              value="24h"
              control={<Radio />}
              label="24h"
              sx={{ margin: 0, color: "black", "&.Mui-checked": { color: "black" } }}
            />
          </RadioGroup>
        </FormControl>
      </CommonBox>
    </Box>
  )
}

export default ProfileDesktop
