"use client";

import { useSession } from "next-auth/react";

export default function Hello() {
  const { data: session } = useSession();

  return (
    <h3 className="font-bold text-3xl md:text-5xl mb-10">
      Hola {session?.user?.name} 👋
    </h3>
  );
}
