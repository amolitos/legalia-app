"use server";

import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const API_URL = process.env.API_URL;
const TOKEN_NAME = "access_token";

async function handler(req: NextRequest) {
  const slug = req.nextUrl.pathname.replace("/api/proxy/", "");
  const apiUrl = `${API_URL}/${slug}${req.nextUrl.search}`;

  const headers = new Headers();
  headers.append("Accept", "application/json");

  const token = (await cookies()).get(TOKEN_NAME)?.value;
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  let body: BodyInit | null = null;
  const contentType = req.headers.get("content-type");

  if (req.method !== "GET" && req.method !== "HEAD") {
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
