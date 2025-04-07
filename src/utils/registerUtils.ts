import i18n from "../i18n"

export const validateEmail = (value: string): string => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!value) return i18n.t("register.email.emailField.error.required")
  if (!regex.test(value)) return i18n.t("register.email.emailField.error.invalid")
  return ""
}

export const validatePassword = (value: string): string => {
  if (!value) return i18n.t("register.password.passwordField.error.required")
  if (value.length < 8) return i18n.t("register.password.passwordField.error.invalid")
  return ""
}

export const validateRepeatPassword = (value: string, original: string): string => {
  if (!value) return i18n.t("register.password.repeatPasswordField.error.required")
  if (value !== original) return i18n.t("register.password.repeatPasswordField.error.mismatch")
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
