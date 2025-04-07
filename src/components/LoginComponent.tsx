import Google from "../assets/icons/Google.svg"
import Logo from "../assets/branding/yana.svg"
import Slogan_ES from "../assets/branding/slogan_es.svg"
import Slogan_EN from "../assets/branding/slogan_en.svg"
import theme from "../theme"

import CustomButton from "../commons/CommonButton"
import CustomTextField from "../commons/CommonTextField"

import { useState, useEffect } from "react"
import { Box, Checkbox, Link, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function LoginComponent() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (rememberMe) {
      localStorage.setItem("username", username)
      localStorage.setItem("password", password)
      localStorage.setItem("rememberMe", "true")
    } else {
      localStorage.removeItem("username")
      localStorage.removeItem("password")
      localStorage.removeItem("rememberMe")
    }
  }

  useEffect(() => {
    const savedUsername = localStorage.getItem("username")
    const savedPassword = localStorage.getItem("password")
    const savedRememberMe = localStorage.getItem("rememberMe") === "true"

    if (savedRememberMe) {
      setUsername(savedUsername || "")
      setPassword(savedPassword || "")
      setRememberMe(savedRememberMe)
    }
  }, [])

  return (
    <>
      <img
        src={Logo}
        alt="Logo"
        style={{ width: "25%", height: "auto", marginBottom: "0.75rem" }}
      />
      <img
        src={navigator.language.includes("es") ? Slogan_ES : Slogan_EN}
        alt="Slogan"
        style={{ width: "55%", height: "auto", marginBottom: "2rem" }}
      />

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          width: "100%",
          padding: "0 1em",
          color: "#fff",
        }}
      >
        <Typography>{t("login.access")}</Typography>

        <Stack spacing={2} direction="column" sx={{ marginTop: 1 }}>
          <CustomTextField label={t("login.username")} value={username} setValue={setUsername} />

          <CustomTextField
            label={t("login.password")}
            type="password"
            value={password}
            setValue={setPassword}
          />
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              onChange={(e) => setRememberMe(e.target.checked)}
              sx={{ color: "#fff", "&.Mui-checked": { color: "#fff" } }}
            />
            <Typography variant="body2" sx={{ color: "#fff" }}>
              {t("login.remember")}
            </Typography>
          </Box>
          <Link
            href="#"
            variant="body2"
            sx={{ color: theme.colors.lightBlue, textDecoration: "none" }}
          >
            {t("login.forgot")}
          </Link>
        </Stack>

        <Stack spacing={1.5} direction="column" sx={{ marginTop: 4 }}>
          <CustomButton type="submit" text={t("login.login")} variantType="primary" />

          {/* <CustomButton
            text={t("login.loginGoogle")}
            icon={<img src={Google} alt="Google Icon" style={{ width: '35px', height: '35px' }} />}
            variantType="secondary"
            onClick={() => console.log('Google login')}
            sx={{ marginBottom: 2 }}
          /> */}
        </Stack>

        <Typography variant="body2" align="center" sx={{ mt: 4 }}>
          {t("login.dontHaveAccount")}{" "}
          <Link
            href="#"
            underline="none"
            sx={{ textTransform: "none", color: theme.colors.lightBlue }}
            onClick={() => navigate("/register")}
          >
            {t("login.register")}
          </Link>
        </Typography>
      </Box>
    </>
  )
}
