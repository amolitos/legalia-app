"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { ChatItem } from "@/components/chats/ChatMessages";

export const useQueryChat = (chatId: string, defaultMessages?: ChatItem[]) => {
  const [chat, setChat] = useState<ChatItem[]>(defaultMessages ?? []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const handleAddToChat = (type: string, message: string) => {
    setChat((prevChat) => [
      ...prevChat,
      {
        type,
        message,
      },
    ]);
  };

  const handleSubmitQuestion = async (data: FieldValues) => {
    setLoading(true);
    setError(null);

    handleAddToChat("question", data.question);

    const res = await fetch(`/api/proxy/chats/${chatId}/query`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.status === 401) return redirect("/login");
    if (!res.ok) setError(`Error ${res.status}: ${res.statusText}`);

    const { answer } = await res.json();
    handleAddToChat("answer", answer);
    setLoading(false);
  };

  return {
    chat,
    loading,
    error,
    handleSubmitQuestion,
  };
};
