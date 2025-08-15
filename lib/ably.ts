import Ably from "ably";

const ablyClient = new Ably.Realtime({
  authUrl: "/api/proxy/ably/auth",
  autoConnect: typeof window !== "undefined",
});

export default ablyClient;
