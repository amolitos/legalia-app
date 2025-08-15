import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function GET(req: Request) {
  // @ts-expect-error request
  const token = await getToken({ req });

  if (!token?.id) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const res = await fetch(`${API_URL}/auth/google-login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      google_token: token.id,
    }),
  });

  const { access_token } = await res.json();

  console.log("====================================");
  console.log(access_token);
  console.log("====================================");

  (await cookies()).set("access_token", access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 5,
    path: "/",
  });

  return NextResponse.redirect(new URL("/experts", req.url));
}
