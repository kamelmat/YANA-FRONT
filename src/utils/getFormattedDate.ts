export const getFormattedDate = (): string => {
  const locale = navigator.language || "es-ES"; // Usa el idioma del dispositivo
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  return date.toLocaleDateString(locale, options);
};
