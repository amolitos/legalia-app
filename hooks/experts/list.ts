"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

export const useExperts = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const handleFetch = async () => {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/proxy/experts");

    if (res.status === 401) return redirect("/login");
    if (!res.ok) setError(`Error ${res.status}: ${res.statusText}`);

    const data = await res.json();
    setExperts(data);
    setLoading(false);
  };

  return {
    experts,
    loading,
    error,
    handleFetch,
  };
};
