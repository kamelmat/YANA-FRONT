import type { FC } from "react"
import { useState, useMemo } from "react"
import { Avatar, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import theme from "../../theme"

import avatarIcon31 from "../../assets/avatars/avatar_31.svg?url"
import avatarIcon32 from "../../assets/avatars/avatar_32.svg?url"
import avatarIcon33 from "../../assets/avatars/avatar_33.svg?url"
import avatarIcon34 from "../../assets/avatars/avatar_34.svg?url"
import avatarIcon35 from "../../assets/avatars/avatar_35.svg?url"

import accountIcon from "../../assets/icons/account_circle.svg?url"
import intaractionsIcon from "../../assets/icons/groups.svg?url"
import configurationIcon from "../../assets/icons/settings2.svg?url"
import logoutIcon from "../../assets/icons/logout_blue.svg?url"
import helpIcon from "../../assets/icons/emergency.svg?url"
import deleteIcon from "../../assets/icons/cancel.svg?url"

import CustomButton from "../../commons/CommonButton"
import Modal from "../../commons/DeleteModal"
import { useDeleteAccount } from '../../hooks/useDeleteAccount';
import { useSettingsStore } from "../../store/useSettingsStore"

const AVATAR_IMAGES = {
  31: avatarIcon31,
  32: avatarIcon32,
  33: avatarIcon33,
  34: avatarIcon34,
  35: avatarIcon35,
}

const ProfileMobile: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const { settings } = useSettingsStore()
  const deleteAccount = useDeleteAccount()
  const handleNavigation = (path: string) => {
    navigate(path)
  }
  
  const avatarSrc = useMemo(() => AVATAR_IMAGES[settings.avatar as keyof typeof AVATAR_IMAGES], [settings.avatar])

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
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
        padding: "6em 1em",
        gap: "1.25rem",
        backgroundColor: settings.customization ? theme.colors[settings.customization as keyof typeof theme.colors] : theme.colors.defaultBackground,
      }}
    >
      <Avatar
        sx={{
          width: "10.81rem",
          height: "10.81rem",
          marginBottom: "3.44rem",
        }}
        src={avatarSrc}
        alt="User Avatar"
      />
      <CustomButton
        text={t("/profile.account")}
        icon={<img src={accountIcon} alt={t("/profile.account")} />}
        iconPosition="end"
        variantType="square-primary"
        onClick={() => handleNavigation("/profile/account")}
      />
      <CustomButton
        text={t("/profile.interactions")}
        icon={<img src={intaractionsIcon} alt={t("/profile.interactions")} />}
        iconPosition="end"
        variantType="square-primary"
        onClick={() => handleNavigation("/profile/interactions")}
      />
      <CustomButton
        text={t("/profile.configuration")}
        icon={<img src={configurationIcon} alt={t("/profile.configuration")} />}
        iconPosition="end"
        variantType="square-primary"
        onClick={() => handleNavigation("/profile/configuration")}
      />
      <CustomButton
        text={t("/profile.help")}
        icon={<img src={helpIcon} alt={t("/profile.help")} />}
        iconPosition="end"
        variantType="square-primary"
        onClick={() => handleNavigation("/profile/help")}
      />
      <CustomButton
        text={t("/profile.logout")}
        icon={<img src={logoutIcon} alt={t("/profile.logout")} />}
        iconPosition="end"
        variantType="square-secondary"
        onClick={() => handleNavigation("/login")}
      />
      <CustomButton
        text={t("/profile.deleteAccount")}
        icon={<img src={deleteIcon} alt={t("/profile.deleteAccount")} />}
        iconPosition="end"
        variantType="ghost"
        onClick={() => setIsDeleteModalOpen(true)}
      />

      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onPasswordSubmit={handleDeleteAccount}
      />
    </Box>
  )
}

export default ProfileMobile
