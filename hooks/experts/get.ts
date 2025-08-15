"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { IError, Expert } from "@/lib/types";

export const useGetExpert = (id: string) => {
  const [expert, setExpert] = useState<Expert>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<IError | null>();

  const handleFetch = async () => {
    setLoading(true);
    setError(null);

    const res = await fetch(`/api/proxy/experts/${id}`);

    if (res.status === 401) return redirect("/login");
    if (!res.ok)
      setError({
        status: res.status,
        message: res.statusText,
      });

    const data = await res.json();
    setExpert(data);
    setLoading(false);
  };

  return {
    expert,
    loading,
    error,
    handleFetch,
  };
};
