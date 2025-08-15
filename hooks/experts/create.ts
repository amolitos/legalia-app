"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";

export const useCreateExpert = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const handleSubmitExpert: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/proxy/experts", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.status === 401) return redirect("/login");
    if (!res.ok) {
      setError(`Error ${res.status}: ${res.statusText}`);
      setLoading(false);
    }

    const { id } = await res.json();
    redirect(`/experts/${id}`);
  };

  return {
    loading,
    error,
    handleSubmitExpert,
  };
};
