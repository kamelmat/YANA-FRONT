import { Typography, Box, Stack, Link } from "@mui/material";
import AuthContainer from "../commons/AuthContainer";
import { useScreenSize } from '../hooks/useScreenSize';
import theme from "../theme";
import CustomButton from "../commons/CommonButton";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

import RegisterMethodStage from "../components/register/RegisterMethodStage";
import RegisterEmailStage from "../components/register/RegisterEmailStage";
import RegisterPasswordStage from "../components/register/RegisterPasswordStage";
import RegisterDoneStage from "../components/register/RegisterDoneStage";

import {
  validateEmail,
  validatePassword,
  validateRepeatPassword,
  getPasswordStrength
} from "../utils/registerUtils";

type Stage = "email" | "password" | "done" | "method";

const STAGES = {
  email: {
    title: "Crear un perfil con tu email",
    subtitle: "Completa los datos y recibe el código de registro por correo electrónico.",
    nextStage: "password",
  },
  password: {
    title: "Crear contraseña",
    subtitle: "Por favor, crea una contraseña segura para tu cuenta.",
    nextStage: "done",
  },
  done: {
    title: "¡Listo!",
    subtitle: "Te damos la bienvenida a You are not alone.",
  },
  method: {
    title: "Crear una cuenta",
    subtitle: "Tu información es confidencial. No vamos a compartir tus datos.",
    nextStage: "email",
  },
};

export default function Register() {
  const screenSize = useScreenSize();
  const navigate = useNavigate();

  const [stage, setStage] = useState<Stage>("method");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState("");
  const [canContinue, setCanContinue] = useState(false);

  useEffect(() => {
    if (stage === "email") {
      const valid = !validateEmail(email);
      setCanContinue(valid && !!name.trim());
    }

    if (stage === "password") {
      const passValid = !validatePassword(password);
      const matchValid = !validateRepeatPassword(repeatPassword, password);
      setCanContinue(passValid && matchValid);
      setPasswordStrength(getPasswordStrength(password));
    }

    if (stage === "done") {
      setCanContinue(true);
    }
  }, [stage, email, password, repeatPassword, name]);

  const handleClick = () => {
    if (stage === "done") {
      navigate('/login');
    } else {
      setStage(STAGES[stage].nextStage as Stage);
    }
  };

  return (
    <AuthContainer screenSize={screenSize}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: "100%", width: "100%", my: 6, px: 1 }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Box
            sx={{
              width: screenSize === "sm" ? "50%" : "40%",
              aspectRatio: "1/1",
              backgroundColor: theme.colors.lightGray,
              borderRadius: '50%',
              mb: 3
            }}
          />
          <Typography variant="h4" align="center" sx={{ color: "#fff", fontWeight: "light" }}>
            {STAGES[stage].title}
          </Typography>
          <Typography variant="body1" fontSize={13} align="center" sx={{ color: "#fff", fontWeight: "light" }}>
            {STAGES[stage].subtitle}
          </Typography>

          <Stack sx={{ width: "100%", gap: 2, my: 3 }}>
            {stage === "method" && (
              <RegisterMethodStage onEmailClick={() => setStage("email")} />
            )}

            {stage === "email" && (
              <RegisterEmailStage
                name={name}
                setName={setName}
                email={email}
                setEmail={(val: string) => {
                  setEmail(val);
                  setEmailError(validateEmail(val));
                }}
                emailError={emailError}
                handleEmailBlur={() => setEmailError(validateEmail(email))}
              />
            )}

            {stage === "password" && (
              <RegisterPasswordStage
                password={password}
                setPassword={setPassword}
                repeatPassword={repeatPassword}
                setRepeatPassword={setRepeatPassword}
                passwordError={passwordError}
                passwordStrength={passwordStrength}
                handlePasswordBlur={() => setPasswordError(validatePassword(password))}
                handleRepeatPasswordBlur={() => setPasswordError(validateRepeatPassword(repeatPassword, password))}
              />
            )}

            {stage === "done" && <RegisterDoneStage onContinue={handleClick} />}
          </Stack>

          {stage === "method" && (
            <Typography variant="body1" fontSize={13} align="center" sx={{ color: "#fff", fontWeight: "light" }}>
              ¿Tienes una cuenta?{' '}
              <Link
                href="#"
                underline="none"
                sx={{ textTransform: 'none', color: theme.colors.lightBlue }}
                onClick={() => navigate('/login')}
              >
                Ingresar
              </Link>
            </Typography>
          )}
        </Box>

        {(stage === "email" || stage === "password") && (
          <CustomButton
            text="Continuar"
            onClick={handleClick}
            disabled={!canContinue}
          />
        )}
      </Box>
    </AuthContainer>
  );
}
