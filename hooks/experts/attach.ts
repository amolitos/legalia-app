"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

export const useAttachDocumentExpert = (expertId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const handleAttach = async (documentId: string) => {
    const res = await fetch(
      `/api/proxy/experts/${expertId}/documents/${documentId}`,
      {
        method: "POST",
        body: JSON.stringify({}),
      }
    );

    if (res.status === 401) return redirect("/login");
    if (!res.ok) {
      setError(`Error ${res.status}: ${res.statusText}`);
      setLoading(false);
    }

    setLoading(false);
  };

  return {
    loading,
    error,
    handleAttach,
  };
};
