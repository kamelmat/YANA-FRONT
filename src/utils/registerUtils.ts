import i18n from "../i18n"

export const validateEmail = (value: string): string => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!value) return i18n.t("register.email.emailField.error.required")
  if (!regex.test(value)) return i18n.t("register.email.emailField.error.invalid")
  return ""
}

export const validatePassword = (value: string): string => {
  if (!value) return i18n.t("register.password.passwordField.error.required")

  const requirements = {
    LENGTH: 1 << 0,
    NUMBER: 1 << 1,
    SPECIAL: 1 << 2,
  }

  let missing = 0
  if (value.length < 8) missing |= requirements.LENGTH
  if (!/[0-9]/.test(value)) missing |= requirements.NUMBER
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) missing |= requirements.SPECIAL

  const errorMap = {
    [requirements.LENGTH]: "tooShort",
    [requirements.NUMBER]: "noNumber",
    [requirements.SPECIAL]: "noSpecialChar",
    [requirements.LENGTH | requirements.NUMBER]: "tooShortAndNoNumber",
    [requirements.LENGTH | requirements.SPECIAL]: "tooShortAndNoSpecial",
    [requirements.NUMBER | requirements.SPECIAL]: "noNumberAndSpecial",
    [requirements.LENGTH | requirements.NUMBER | requirements.SPECIAL]:
      "tooShortAndNoNumberAndSpecial",
  }

  return missing ? i18n.t(`register.password.passwordField.error.invalid.${errorMap[missing]}`) : ""
}

export const validateRepeatPassword = (value: string, original: string): string => {
  if (!value) return i18n.t("register.password.repeatPasswordField.error.required")
  if (value !== original) return i18n.t("register.password.repeatPasswordField.error.mismatch")
  return ""
}

export const validateName = (value: string): string => {
  if (!value) return i18n.t("register.email.nameField.error.required")
  if (value.trim().length < 2) return i18n.t("register.email.nameField.error.tooShort")
  return ""
}

export const validateLastName = (value: string): string => {
  if (!value) return i18n.t("register.email.lastNameField.error.required")
  if (value.trim().length < 2) return i18n.t("register.email.lastNameField.error.tooShort")
  return ""
}

export const getPasswordStrength = (value: string): string => {
  if (!value) return ""
  const hasLetters = /[a-zA-Z]/.test(value)
  const hasNumbers = /[0-9]/.test(value)
  const hasSymbols = /[^a-zA-Z0-9]/.test(value)
  if (value.length < 8) return i18n.t("register.password.passwordStrength.weak")
  if (hasLetters && hasNumbers && value.length >= 12 && hasSymbols)
    return i18n.t("register.password.passwordStrength.strong")
  if (hasLetters && hasNumbers) return i18n.t("register.password.passwordStrength.medium")
  return i18n.t("register.password.passwordStrength.weak")
}
