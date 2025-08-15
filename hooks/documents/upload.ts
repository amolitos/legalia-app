"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { FileWithPath } from "react-dropzone";

export const useUploadDocument = ({
  onUploadEvent,
}: {
  onUploadEvent?: (id: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const handleUpload = async (files: FileWithPath[]) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    files.forEach((ff) => {
      formData.append("file", ff);
    });

    const res = await fetch(`/api/proxy/documents/upload`, {
      method: "POST",
      body: formData,
    });

    if (res.status === 401) return redirect("/login");
    if (!res.ok) {
      setError(`Error ${res.status}: ${res.statusText}`);
      setLoading(false);
    }

    const { id } = await res.json();

    if (onUploadEvent) onUploadEvent(id);

    setLoading(false);
  };

  return {
    loading,
    error,
    handleUpload,
  };
};
