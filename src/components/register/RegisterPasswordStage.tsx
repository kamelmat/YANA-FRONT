import { Typography, Box, FormControl } from "@mui/material";
import CustomTextField from "../../commons/CommonTextField";
import { useTranslation } from "react-i18next";
import { validateRepeatPassword } from "../../utils/registerUtils";

interface Props {
  password: string;
  setPassword: (val: string) => void;
  repeatPassword: string;
  setRepeatPassword: (val: string) => void;
  passwordError: string;
  setPasswordError: (val: string) => void;
  passwordStrength: string;
  handlePasswordBlur: () => void;
  handleRepeatPasswordBlur: () => void;
}

export default function RegisterPasswordStage({
  password, setPassword,
  repeatPassword, setRepeatPassword,
  passwordError, setPasswordError,
  passwordStrength,
  handlePasswordBlur, handleRepeatPasswordBlur
}: Props) {
  const { t } = useTranslation();

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {/* username for accessibility warning */}
      <input
        type="text"
        name="username"
        autoComplete="username"
        style={{ display: 'none' }}
      />

      <CustomTextField
        label={t("register.password.passwordField.label")}
        type="password"
        value={password}
        setValue={setPassword}
        placeholder={t("register.password.passwordField.placeholder")}
        error={!!passwordError}
        onBlur={handlePasswordBlur}
        autoComplete="new-password"
      />
      {password && (
        <Typography fontSize={13} sx={{ color: "#fff", fontWeight: "light" }}>
          {t("register.password.passwordStrength.text")}:{" "}
          <Box component="span" sx={{
            color: passwordStrength === t("register.password.passwordStrength.strong") ? "limegreen"
              : passwordStrength === t("register.password.passwordStrength.medium") ? "orange"
                : "red",
            fontWeight: "bold"
          }}>
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
          setPasswordError(validateRepeatPassword(val, password));
        }}
        placeholder={t("register.password.repeatPasswordField.placeholder")}
        error={!!passwordError}
        helperText={passwordError}
        onBlur={handleRepeatPasswordBlur}
        autoComplete="new-password"
        sx={{ marginTop: 2 }}
      />
    </form>
  );
}
