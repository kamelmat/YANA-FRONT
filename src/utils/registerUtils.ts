import i18n from "../i18n";

export const validateEmail = (value: string): string => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) return i18n.t("register.email.emailField.error.required");
  if (!regex.test(value)) return i18n.t("register.email.emailField.error.invalid");
  return "";
};

export const validatePassword = (value: string): string => {
  if (!value) return i18n.t("register.password.passwordField.error.required");

  const requirements = {
    LENGTH: value.length < 8,
    NUMBER: !/[0-9]/.test(value),
    SPECIAL: !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value),
    UPPERCASE: !/[A-Z]/.test(value),
    LOWERCASE: !/[a-z]/.test(value),
  };

  const requirementNames = {
    LENGTH: i18n.t("register.password.requirements.length"),
    NUMBER: i18n.t("register.password.requirements.number"),
    SPECIAL: i18n.t("register.password.requirements.special"),
    UPPERCASE: i18n.t("register.password.requirements.uppercase"),
    LOWERCASE: i18n.t("register.password.requirements.lowercase"),
  };

  const missingRequirements = Object.entries(requirements)
    .filter(([_, isMissing]) => isMissing)
    .map(([key]) => requirementNames[key as keyof typeof requirementNames]);

  if (missingRequirements.length === 0) return "";

  return i18n.t("register.password.passwordField.error.invalid", {
    requirements: missingRequirements.join(", "),
  });
};

export const validateRepeatPassword = (value: string, original: string): string => {
  if (!value) return i18n.t("register.password.repeatPasswordField.error.required");
  if (value !== original) return i18n.t("register.password.repeatPasswordField.error.mismatch");
  return "";
};

export const validateName = (value: string): string => {
  if (!value) return i18n.t("register.email.nameField.error.required");
  if (value.trim().length < 2) return i18n.t("register.email.nameField.error.tooShort");
  return "";
};

export const validateLastName = (value: string): string => {
  if (!value) return i18n.t("register.email.lastNameField.error.required");
  if (value.trim().length < 2) return i18n.t("register.email.lastNameField.error.tooShort");
  return "";
};

export const getPasswordStrength = (value: string): string => {
  if (!value) return "";
  const hasLetters = /[a-zA-Z]/.test(value);
  const hasNumbers = /[0-9]/.test(value);
  const hasSymbols = /[^a-zA-Z0-9]/.test(value);
  if (value.length < 8) return i18n.t("register.password.passwordStrength.weak");
  if (hasLetters && hasNumbers && value.length >= 12 && hasSymbols)
    return i18n.t("register.password.passwordStrength.strong");
  if (hasLetters && hasNumbers) return i18n.t("register.password.passwordStrength.medium");
  return i18n.t("register.password.passwordStrength.weak");
};
