import { useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

const NOTIFICATION_URL = process.env.NEXT_PUBLIC_NOTIFICATION_URL ?? "";

export const useNotification = (onResolve: () => void) => {
  useEffect(() => {
    const eventSource = new EventSourcePolyfill(NOTIFICATION_URL, {
      withCredentials: true,
    });

    eventSource.onopen = () => {
      console.log("Conexión SSE establecida con el servidor.");
    };

    eventSource.addEventListener("ocr_update", () => {
      console.log("¡Notificación recibida!");
      onResolve();
    });

    eventSource.onerror = (error) => {
      console.error("Error en la conexión SSE. Se cerrará.", error);
      eventSource.close();
    };

    return () => eventSource.close();
  }, [onResolve]);
};
