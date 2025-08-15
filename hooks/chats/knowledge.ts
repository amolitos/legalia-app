"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { Document } from "@/lib/types";

export const useKnowledgeChat = (chatId: string) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const handleFetch = async () => {
    setLoading(true);

    const res = await fetch(`/api/proxy/chats/${chatId}/documents/`);

    if (res.status === 401) return redirect("/login");
    if (!res.ok) {
      setError(`Error ${res.status}: ${res.statusText}`);
      setLoading(false);
    }

    const data = await res.json();
    setDocuments(data);
    setLoading(false);
  };

  const handleAttach = async (documentId: string) => {
    setLoading(true);

    const res = await fetch(
      `/api/proxy/chats/${chatId}/documents/${documentId}`,
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

  const handleDetach = async (documentId: string) => {
    setLoading(true);

    const res = await fetch(
      `/api/proxy/chats/${chatId}/documents/${documentId}`,
      {
        method: "DELETE",
        body: JSON.stringify({}),
      }
    );

    if (res.status === 401) return redirect("/login");
    if (!res.ok) {
      setError(`Error ${res.status}: ${res.statusText}`);
      setLoading(false);
    }

    handleFetch();
  };

  return {
    documents,
    loading,
    error,
    handleFetch,
    handleAttach,
    handleDetach,
  };
};
