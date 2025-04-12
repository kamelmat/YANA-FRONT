import { Typography, Box, Stack, Link, CircularProgress } from "@mui/material";
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
import method from "../assets/register/create.svg";
import email from "../assets/register/mail.svg";
import password from "../assets/register/password.svg";
import done from "../assets/register/done.webp";

import {
  validateEmail,
  validatePassword,
  validateRepeatPassword,
  getPasswordStrength,
  validateName,
  validateLastName
} from "../utils/registerUtils";

import { useRegister } from "../hooks/useRegister";
import { useCheckEmail } from "../hooks/useCheckEmail";

export type Stage = "email" | "password" | "done" | "method";

const NEXT_STAGE = {
  email: "password",
  method: "email",
};

const IMGS = {
  method,
  email,
  password,
  done
}

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
  const [nameError, setNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState("");
  const [canContinue, setCanContinue] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  const { mutate: register, isPending: isRegistering } = useRegister(setStage);
  const { mutate: checkEmail, isPending: isCheckingEmail } = useCheckEmail();

  useEffect(() => {
    if (stage === "email") {
      const valid = !validateEmail(email) && !validateName(name) && !validateLastName(lastName);
      setCanContinue(valid);
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
  }, [stage, email, password, repeatPassword, name, lastName]);

  const handleClick = async () => {
    if (stage === "done") {
      navigate('/login');
      return;
    }

    if (stage === "email") {
      checkEmail(email, {
        onSuccess: (isInUse) => {
          if (!isInUse) {
            setStage(NEXT_STAGE[stage] as Stage);
          } else {
            setEmailError(t("register.email.emailField.error.taken"));
            setCanContinue(false);
          }
        },
      });
    }

    if (stage === "password") {
      register({
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
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%", width: "100%", my: 6, px: 1.5 }}
      >  
        <Box
          sx={{
            width: screenSize === "sm" ? "35%" : "40%",
            aspectRatio: "1/1",
            mb: 3
          }}
        >
          <img src={IMGS[stage]} alt={stage} style={{ height: "100%", width: "100%" }} />
        </Box>
        <Typography variant="h5" align="center" sx={{ color: "#fff", fontWeight: "light" }}>
          {t(`register.${stage}.title`)}
        </Typography>
        <Typography variant="body1" fontSize={13} align="center" mt={1} sx={{ color: "#fff", fontWeight: "light" }}>
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
              setEmail={setEmail}
              emailError={emailError}
              setEmailError={setEmailError}
              nameError={nameError}
              lastNameError={lastNameError}
              handleNameBlur={() => setNameError(validateName(name))}
              handleLastNameBlur={() => setLastNameError(validateLastName(lastName))}
              onEmailChecked={setEmailChecked}
              isEmailChecked={emailChecked}
            />
          )}

          {stage === "password" && (
            <RegisterPasswordStage
              password={password}
              setPassword={setPassword}
              repeatPassword={repeatPassword}
              setRepeatPassword={setRepeatPassword}
              passwordError={passwordError}
              setPasswordError={setPasswordError}
              passwordStrength={passwordStrength}
              handlePasswordBlur={() => setPasswordError(validatePassword(password))}
              handleRepeatPasswordBlur={() => setPasswordError(validateRepeatPassword(repeatPassword, password))}
            />
          )}

          {stage === "done" && <RegisterDoneStage onContinue={handleClick} />}

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
              disabled={!canContinue || isCheckingEmail || isRegistering}
              icon={(isCheckingEmail || isRegistering) ? <CircularProgress size={20} sx={{ color: 'white' }} /> : undefined}
            />
          )}
        </Stack>
      </Box>
    </AuthContainer>
  );
}
