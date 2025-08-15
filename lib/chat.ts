export const getModePlaceholder = (mode?: string) => {
  if (mode == "document") {
    return `Pide un documento detallado a `;
  } else {
    return `Pregunta a `;
  }
};
