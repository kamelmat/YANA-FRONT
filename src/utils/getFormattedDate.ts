export const getFormattedDate = (): string => {
  const locale = navigator.language || "es-ES" // Usa el idioma del dispositivo
  const date = new Date()
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  }
  const formattedDate = date.toLocaleDateString(locale, options)
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
}
