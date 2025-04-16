import type { FC } from "react"
import { useState, useMemo, useEffect } from "react"
import { Avatar, Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import theme from "../../theme"
import { useSettingsStore } from "../../store/useSettingsStore"
import avatarIcon31 from "../../assets/avatars/avatar_31.svg"
import avatarIcon32 from "../../assets/avatars/avatar_32.svg"
import avatarIcon33 from "../../assets/avatars/avatar_33.svg"
import avatarIcon34 from "../../assets/avatars/avatar_34.svg"
import avatarIcon35 from "../../assets/avatars/avatar_35.svg"
import CustomButton from "../../commons/CommonButton"
import deleteIcon from "../../assets/icons/cancel.svg"
import { useScreenSize } from "../../hooks/useScreenSize"
import Modal from "../../commons/DeleteModal"
import { useDeleteAccount } from '../../hooks/useDeleteAccount'
import AccountSettings from "../../pages/profile/AccountSettings"
import ConfigurationSettings from "../../pages/profile/ConfigurationSettings"
import InteractionsSettings from "../../pages/profile/InteractionsSettings"

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
  const { settings } = useSettingsStore()
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

  const avatarSrc = useMemo(() => AVATAR_IMAGES[settings.avatar as keyof typeof AVATAR_IMAGES], [settings.avatar])

  return (
    <Box
      sx={{
        height: {
          lg: "100vh",
          sm: "100%",
        },
        width: "100vw",
        display: "grid",
        gridTemplateRows: {
          lg: "repeat(9, 1fr)",
          sm: "repeat(16, 4em)",
        },
        gridTemplateColumns: "repeat(12, 1fr)",
        margin: 0,
        padding:{
          sm: "8em",
          lg: "10em 20em"
        },
        gap: "1em",
        backgroundColor: theme.colors.blackBackground,
      }}
    >
      {(screenSize === "lg" || screenSize === "xl") && (
        <Typography
          variant="h4"
          sx={{
            gridRow: 1,
            gridColumn: "1 / 3",
            justifySelf: "start",
            color: "white",
          }}
        >
          {t("/profile.title")}
        </Typography>
      )}
      
      <Box
        sx={{
          gridRow: {
            lg: "1 / 10",
            sm: "1 / 4"
          },
          gridColumn: {
            lg: "1 / 3",
            sm: "1 / 13"
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2
        }}
      >
        <Avatar
          sx={{
            width: {
              lg: "100%",
              sm: "auto"
            },
            height: {
              lg: "auto",
              sm: "100%"
            },
            aspectRatio: "1/1",
          }}
          src={avatarSrc}
          alt="User Avatar"
        />
      </Box>

      {/* White line */}
      <Box
        sx={{
          height: {
            lg: "100%",
            sm: "1px"
          },
          width: {
            lg: "1px",
            sm: "100%"
          },
          backgroundColor: "white",
          gridRow: {
            lg: "1 / 10",
            sm: "4"
          },
          gridColumn: {
            lg: "3",
            sm: "1 / 13"
          },
        }}
      />

      {/* Account Section */}
      <AccountSettings />

      {/* Configuration Section */}
      <ConfigurationSettings />

      {/* Interactions Section */}
      <InteractionsSettings />

      {/* Delete Account Button */}
      <Box
        sx={{
          gridRow: {
            lg: "9 / 10",
            sm: "16 / 17"
          },
          gridColumn: {
            lg: "9 / 13",
            sm: "1 / 13"
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
          sx={{ border: `3px solid ${theme.colors.lightPink}`, borderRadius: "0.75rem", height: "100%" }}
        />
      </Box>

      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onPasswordSubmit={handleDeleteAccount}
      />
    </Box>
  )
}

export default ProfileDesktop
