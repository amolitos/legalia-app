"use client";

import { useCallback } from "react";
import { useApi } from "./useApi";

export const useDownloadTranscription = () => {
  const { getFile } = useApi();

  const handleDownload = useCallback(
    async (documentId: number) => {
      try {
        const response = await getFile(
          `/documents/${documentId}/transcription`
        );

        const contentDisposition = response.headers["content-disposition"];
        let fileName = "transcripcion.txt";
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="([^"]+)"/);
          if (fileNameMatch && fileNameMatch.length > 1) {
            fileName = fileNameMatch[1];
          }
        }

        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();

        link?.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error al descargar el archivo:", error);
        alert("No se pudo descargar el archivo.");
      }
    },
    [getFile]
  );

  return {
    handleDownload,
  };
};
