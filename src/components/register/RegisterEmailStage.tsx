import CustomTextField from "../../commons/CommonTextField";
import { useTranslation } from "react-i18next";
import { validateEmail } from "../../utils/registerUtils";

interface Props {
  name: string;
  setName: (val: string) => void;
  lastName: string;
  setLastName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  emailError: string;
  setEmailError: (val: string) => void;
  nameError: string;
  lastNameError: string;
  handleNameBlur: () => void;
  handleLastNameBlur: () => void;
  onEmailChecked: (val: boolean) => void;
  isEmailChecked: boolean;
}

export default function RegisterEmailStage({ 
  name, setName, 
  lastName, setLastName, 
  email, setEmail, 
  emailError, setEmailError,
  nameError, lastNameError,
  handleNameBlur, handleLastNameBlur,
}: Props) {
  const { t } = useTranslation();

  return (
    <>
      <CustomTextField
        label={t("register.email.nameField.label")}
        value={name}
        setValue={setName}
        placeholder={t("register.email.nameField.placeholder")}
        error={!!nameError}
        helperText={nameError}
        onBlur={handleNameBlur}
      />
      <CustomTextField
        label={t("register.email.lastNameField.label")}
        value={lastName}
        setValue={setLastName}
        placeholder={t("register.email.lastNameField.placeholder")}
        error={!!lastNameError}
        helperText={lastNameError}
        onBlur={handleLastNameBlur}
      />
      <CustomTextField
        label={t("register.email.emailField.label")}
        value={email}
        setValue={(val: string) => {
          setEmail(val);
          const error = validateEmail(val);
          setEmailError(error);
        }}
        placeholder={t("register.email.emailField.placeholder")}
        error={!!emailError}
        helperText={emailError}
        onBlur={() => {
          const error = validateEmail(email);
          setEmailError(error);
        }}
      />
    </>
  );
}
