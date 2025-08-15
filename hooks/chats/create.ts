"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

export const useNewChat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const handleNewChat = async (expertId: string) => {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/proxy/chats", {
      method: "POST",
      body: JSON.stringify({
        expert_id: expertId,
      }),
    });

    if (res.status === 401) return redirect("/login");
    if (!res.ok) {
      setError(`Error ${res.status}: ${res.statusText}`);
      setLoading(false);
    }

    const { id } = await res.json();
    redirect(`/chats/${id}`);
  };

  return {
    loading,
    error,
    handleNewChat,
  };
};
