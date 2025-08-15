/**
 * Convierte un tamaño de archivo en bytes a un formato legible (MB o GB).
 *
 * @param {number} bytes El tamaño del archivo en bytes.
 * @returns {string} El tamaño formateado como string (e.g., "150.50 MB" o "2.50 GB").
 */
export function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) {
    return "0 Bytes";
  }

  const megabytes = bytes / (1024 * 1024);

  if (megabytes > 1000) {
    const gigabytes = megabytes / 1024;
    return `${gigabytes.toFixed(2)} GB`;
  } else {
    return `${megabytes.toFixed(2)} MB`;
  }
}

/**
 * Extrae la extensión de un archivo a partir de su tipo MIME.
 * @param {string} mimeType El tipo MIME, ej. "application/pdf".
 * @returns {string|null} La extensión del archivo (ej. "pdf") o null si el formato es inválido.
 */
export function getMimeType(mimeType: string): string | null {
  if (!mimeType || typeof mimeType !== "string") {
    return null;
  }

  const parts = mimeType.split("/");
  return parts[parts.length - 1] || null;
}
