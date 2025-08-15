"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { IError, Chat, ChatMessage } from "@/lib/types";
import { ChatItem } from "@/components/chats/ChatMessages";

export const useGetChat = (id: string) => {
  const [chat, setChat] = useState<Chat>();
  const [messages, setMessages] = useState<ChatItem[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<IError | null>();

  const handleFetch = async () => {
    setLoading(true);
    setError(null);

    const res = await fetch(`/api/proxy/chats/${id}`);

    if (res.status === 401) return redirect("/login");
    if (!res.ok)
      setError({
        status: res.status,
        message: res.statusText,
      });

    const data = await res.json();
    setChat(data);

    const messages = data.messages.flatMap((item: ChatMessage) => [
      { type: "question", message: item.question },
      { type: "answer", message: item.answer },
    ]);

    setMessages(messages);
    setLoading(false);
  };

  return {
    chat,
    messages,
    loading,
    error,
    handleFetch,
  };
};
