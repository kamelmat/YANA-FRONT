import { Typography, Box, Stack, Link } from "@mui/material";
import AuthContainer from "../commons/AuthContainer";
import { useScreenSize } from '../hooks/useScreenSize';
import theme from "../theme";
import CustomButton from "../commons/CommonButton";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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

import { useRegister } from "../hooks/useRegister";

type Stage = "email" | "password" | "done" | "method";

const NEXT_STAGE = {
  email: "password",
  password: "done",
  method: "email",
};

export default function Register() {
  const screenSize = useScreenSize();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [stage, setStage] = useState<Stage>("method");
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState("");
  const [canContinue, setCanContinue] = useState(false);

  const { mutate } = useRegister();

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
      return;
    }

    if (stage === "email") {
      setStage(NEXT_STAGE[stage] as Stage);
    }

    if (stage === "password") {
      mutate({
        name,
        last_name: lastName,
        email,
        password,
      });
    }
  };

  return (
    <AuthContainer screenSize={screenSize}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={stage === "done" ? "center" : "space-between"}
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
            {t(`register.${stage}.title`)}
          </Typography>
          <Typography variant="body1" fontSize={13} align="center" sx={{ color: "#fff", fontWeight: "light" }}>
            {t(`register.${stage}.subtitle`)}
          </Typography>

          <Stack sx={{ width: "100%", gap: 2, my: 3 }}>
            {stage === "method" && (
              <RegisterMethodStage onEmailClick={() => setStage("email")} />
            )}

            {stage === "email" && (
              <RegisterEmailStage
                name={name}
                setName={setName}
                lastName={lastName}
                setLastName={setLastName}
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
        </Box>

        {stage === "method" && (
            <Typography variant="body1" fontSize={13} align="center" sx={{ color: "#fff", fontWeight: "light" }}>
              {t("register.method.haveAccount")}{' '}
              <Link
                href="#"
                underline="none"
                sx={{ textTransform: 'none', color: theme.colors.lightBlue }}
                onClick={() => navigate('/login')}
              >
                {t("register.method.login")}
              </Link>
            </Typography>
          )}

        {(stage === "email" || stage === "password") && (
          <CustomButton
            text={t("register.continue")}
            onClick={handleClick}
            disabled={!canContinue}
          />
        )}
      </Box>
    </AuthContainer>
  );
}
