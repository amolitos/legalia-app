import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const API_URL = process.env.API_URL;

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 24 * 60 * 5,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        try {
          const res = await fetch(`${API_URL}/auth/google-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ google_token: account.id_token }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error("Fallo al autenticar con el backend.");
          }

          console.log("====================================");
          console.log(data.access_token);
          console.log("====================================");
          token.accessToken = data.access_token;
          token.id = data.user_id;
        } catch (error) {
          console.error("Error en el callback JWT:", error);
          return { ...token, error: "BackendLoginFailed" };
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session.user.id = token.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? `${baseUrl}/dashboard` : url;
    },
  },
});

export { handler as GET, handler as POST };
