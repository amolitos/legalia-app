"use server";

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const API_URL = process.env.API_URL;

async function handler(req: NextRequest) {
  const sessionToken = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const accessToken = sessionToken?.accessToken as string | undefined;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const slug = req.nextUrl.pathname.replace("/api/proxy/", "");
  const apiUrl = `${API_URL}/${slug}${req.nextUrl.search}`;

  const headers = new Headers();
  headers.append("Accept", "application/json");

  if (accessToken) {
    headers.append("Authorization", `Bearer ${accessToken}`);
  }

  let body: BodyInit | null = null;
  const contentType = req.headers.get("content-type");

  if (
    req.method !== "GET" &&
    req.method !== "HEAD" &&
    req.method !== "DELETE"
  ) {
    if (contentType?.includes("multipart/form-data")) {
      body = await req.formData();
    } else {
      body = JSON.stringify(await req.json());
      headers.set("Content-Type", "application/json");
    }
  }

  return await fetch(apiUrl, {
    method: req.method,
    headers: headers,
    body: body,
  });
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH,
};
