import { useEffect } from "react";
import { InboundMessage } from "ably";
import { useSession } from "next-auth/react";
import ablyClient from "@/lib/ably";

type Props = {
  event: string;
  callback: (data: string) => void;
};

export const useNotification = ({ event, callback }: Props) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (status !== "authenticated" || !userId) {
      return;
    }

    const channel = ablyClient.channels.get(`notifications:${userId}`);

    const handleMessage = (message: InboundMessage) => {
      console.log(`Mensaje de ${event} recibido:`, message.data);
      callback(message.data);
    };

    channel.subscribe(event, handleMessage);

    return () => {
      channel.unsubscribe(event, handleMessage);
    };
  }, [event, callback, status, userId]);
};
