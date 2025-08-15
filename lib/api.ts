import { redirect } from "next/navigation";

export async function api(endpoint: string, options?: RequestInit) {
  const defaultOptions: RequestInit = {
    ...options,
  };

  const res = await fetch(`/api/proxy${endpoint}`, defaultOptions);

  if (res.status === 401) return redirect("/login");
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

  return res.json();
}
