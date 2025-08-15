export const getModePlaceholder = (mode?: string) => {
  if (mode == "document") {
    return "Pide un documento detallado a ";
  } else if (mode == "audio") {
    return "Pide un audio a ";
  } else {
    return "Pregunta a ";
  }
};
