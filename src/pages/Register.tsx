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
import method from "../assets/register/create.svg?url";
import email from "../assets/register/mail.svg?url";
import password from "../assets/register/password.svg?url";
import done from "../assets/register/done.webp";
import back from "../assets/icons/back.svg?url";

import {
  validateEmail,
  getPasswordStrength,
  validateName,
  validateLastName
} from "../utils/registerUtils";

import { useRegister } from "../hooks/useRegister";
import { useCheckEmail } from "../hooks/useCheckEmail";
import { useAuthStore } from "../store/authStore";

export type Stage = "email" | "password" | "done" | "method";

const STAGE = {
  email: {
    next: "password",
    back: "method"
  },
  password: {
    next: "done",
    back: "email"
  },
  method: {
    next: "email",
  },
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
  const accessToken = useAuthStore((state) => state.accessToken);

  const [stage, setStage] = useState<Stage>("method");
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
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
      const passValid = !passwordError;
      const matchValid = !repeatPasswordError;
      setCanContinue(passValid && matchValid);
      setPasswordStrength(getPasswordStrength(password));
    }

    if (stage === "done") {
      setCanContinue(true);
    }
  }, [stage, email, password, name, lastName, passwordError, repeatPasswordError]);

  const handleClick = async () => {
    if (stage === "done" && accessToken) {
      navigate('/');
      return;
    }

    if (stage === "email") {
      checkEmail(email, {
        onSuccess: (isInUse) => {
          if (!isInUse) {
            setStage(STAGE[stage].next as Stage);
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

  const handleBackClick = () => {
    if (stage === "method") navigate(-1);
    else if (stage === "done") return;
    else setStage(STAGE[stage].back as Stage);
  };

  return (
    <AuthContainer screenSize={screenSize}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={ (screenSize === "sm" || !(stage === "email" || stage === "password")) ? "center" : "space-between"}
        alignItems="center"
        position="relative"
        sx={{ height: "100%", width: "100%", mt: 2, mb: { xs: 6, md: 2 }, px: 1.5 }}
      >  
        { stage !== "done" &&
          <Box
            component="img"
            src={back}
            alt="back"
            sx={{
              height: "2em",
              width: "2em",
              alignSelf: "flex-start",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.15)"
              },
              position: "absolute",
              top: 0,
              left: "1em"
            }}
            onClick={handleBackClick}
          />
        }
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          mt={(stage === "method" || stage === "done") || screenSize === "sm" || screenSize === "lg" ? 0 : 10 }
        >
          <Box
            sx={{
              width: screenSize === "sm" ? "35%" : screenSize !== "lg" ? "40%" : "25%",
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
                repeatPasswordError={repeatPasswordError}
                setRepeatPasswordError={setRepeatPasswordError}
                passwordStrength={passwordStrength}
              />
            )}

            {stage === "done" && <RegisterDoneStage onContinue={handleClick} />}

            {stage === "method" && (
              <Typography variant="body1" fontSize={13} align="center" sx={{ color: "#fff", fontWeight: "light" }}>
                {t("register.method.haveAccount")}{' '}
                <Link
                  underline="none"
                  sx={{ textTransform: 'none', color: theme.colors.lightBlue }}
                  onClick={() => navigate('/login')}
                >
                  {t("register.method.login")}
                </Link>
              </Typography>
            )}
          </Stack>
        </Box>
        {(stage === "email" || stage === "password") && (
          <CustomButton
            text={t("register.continue")}
            onClick={handleClick}
            disabled={!canContinue || isCheckingEmail || isRegistering}
            icon={(isCheckingEmail || isRegistering) ? <CircularProgress size={20} sx={{ color: 'white' }} /> : undefined}
          />
        )}
      </Box>
    </AuthContainer>
  );
}
