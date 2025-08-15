export function formatMx(isoDate: string) {
  const date = new Date(isoDate);
  const formattedDate = new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return formattedDate;
}
