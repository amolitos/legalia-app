"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Document } from "@/lib/types";

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const handleFetch = async () => {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/proxy/documents");

    if (res.status === 401) return redirect("/login");
    if (!res.ok) setError(`Error ${res.status}: ${res.statusText}`);

    const data = await res.json();
    setDocuments(data);
    setLoading(false);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return {
    documents,
    loading,
    error,
  };
};
