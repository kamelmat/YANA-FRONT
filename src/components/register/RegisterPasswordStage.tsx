import { Typography, Box } from "@mui/material";
import CustomTextField from "../../commons/CommonTextField";

interface Props {
  password: string;
  setPassword: (val: string) => void;
  repeatPassword: string;
  setRepeatPassword: (val: string) => void;
  passwordError: string;
  passwordStrength: string;
  handlePasswordBlur: () => void;
  handleRepeatPasswordBlur: () => void;
}

export default function RegisterPasswordStage({
  password, setPassword,
  repeatPassword, setRepeatPassword,
  passwordError, passwordStrength,
  handlePasswordBlur, handleRepeatPasswordBlur
}: Props) {
  return (
    <>
      <CustomTextField
        label="Contraseña"
        type="password"
        value={password}
        setValue={setPassword}
        placeholder="Crea tu contraseña (mínimo 8 caracteres)"
        error={!!passwordError}
        onBlur={handlePasswordBlur}
      />
      {password && (
        <Typography fontSize={13} sx={{ color: "#fff", fontWeight: "light" }}>
          Seguridad de la contraseña:{" "}
          <Box component="span" sx={{
            color: passwordStrength === "Fuerte" ? "limegreen"
              : passwordStrength === "Media" ? "orange"
                : "red",
            fontWeight: "bold"
          }}>
            {passwordStrength}
          </Box>
        </Typography>
      )}
      <CustomTextField
        label="Repetir contraseña"
        type="password"
        value={repeatPassword}
        setValue={setRepeatPassword}
        placeholder="Repite tu contraseña"
        error={!!passwordError}
        helperText={passwordError}
        onBlur={handleRepeatPasswordBlur}
      />
    </>
  );
}
