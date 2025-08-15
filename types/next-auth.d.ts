// types/next-auth.d.ts

import "next-auth";
import "next-auth/jwt";

/**
 * Extiende los tipos base de next-auth para incluir las propiedades
 * que estamos añadiendo en los callbacks.
 */

declare module "next-auth" {
  /**
   * El objeto User que se pasa al callback `jwt` la primera vez.
   * Le añadimos las propiedades que retornamos desde `authorize`.
   */
  interface User {
    id: number; // o string, según el tipo de tu user_id
    accessToken: string;
  }

  /**
   * El objeto Session que se devuelve desde `useSession` y `getSession`.
   * Le añadimos nuestro `id` personalizado al `user`.
   */
  interface Session {
    user: {
      id: number; // o string
    } & DefaultSession["user"]; // Mantiene las propiedades originales (name, email, image)
  }
}

declare module "next-auth/jwt" {
  /**
   * El contenido del token JWT encriptado.
   * Le añadimos las propiedades que guardamos en el callback `jwt`.
   */
  interface JWT {
    id: number; // o string
    accessToken: string;
  }
}
