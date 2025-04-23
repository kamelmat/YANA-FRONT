import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CustomTextField from "../../commons/CommonTextField";
import { validatePassword, validateRepeatPassword } from "../../utils/registerUtils";

interface Props {
  password: string;
  setPassword: (val: string) => void;
  repeatPassword: string;
  setRepeatPassword: (val: string) => void;
  passwordError: string;
  setPasswordError: (val: string) => void;
  repeatPasswordError: string;
  setRepeatPasswordError: (val: string) => void;
  passwordStrength: string;
}

export default function RegisterPasswordStage({
  password,
  setPassword,
  repeatPassword,
  setRepeatPassword,
  passwordError,
  setPasswordError,
  repeatPasswordError,
  setRepeatPasswordError,
  passwordStrength,
}: Props) {
  const { t } = useTranslation();

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {/* username for accessibility warning */}
      <input type="text" name="username" autoComplete="username" style={{ display: "none" }} />

      <CustomTextField
        label={t("register.password.passwordField.label")}
        type="password"
        value={password}
        setValue={(val: string) => {
          setPassword(val);
          setPasswordError(validatePassword(val));
        }}
        placeholder={t("register.password.passwordField.placeholder")}
        error={!!passwordError}
        helperText={passwordError}
        autoComplete="new-password"
      />
      {password && (
        <Typography variant="body2" sx={{ color: "#fff", fontWeight: "light" }}>
          {t("register.password.passwordStrength.text")}:{" "}
          <Box
            component="span"
            sx={{
              color:
                passwordStrength === t("register.password.passwordStrength.strong")
                  ? "limegreen"
                  : passwordStrength === t("register.password.passwordStrength.medium")
                    ? "orange"
                    : "red",
              fontWeight: "bold",
            }}
          >
            {passwordStrength}
          </Box>
        </Typography>
      )}
      <CustomTextField
        label={t("register.password.repeatPasswordField.label")}
        type="password"
        value={repeatPassword}
        setValue={(val: string) => {
          setRepeatPassword(val);
          if (val && password) {
            setRepeatPasswordError(validateRepeatPassword(val, password));
          }
        }}
        placeholder={t("register.password.repeatPasswordField.placeholder")}
        error={!!repeatPasswordError}
        helperText={repeatPasswordError}
        autoComplete="new-password"
        sx={{ marginTop: 2 }}
      />
    </form>
  );
}
