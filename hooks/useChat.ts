import { useCallback, useEffect, useState } from "react";
import { useApi } from "./useApi";
import { useRouter } from "next/navigation";
import { TaskNotification } from "@/components/chats/ChatMessages";
import { Chat, ChatMessage, Document, MediaURLResponse } from "@/lib/types";

export const useFetchChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { get } = useApi();

  const fetchChats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await get<Chat[]>("/chats");
      setChats(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [get]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return { chats, isLoading, error, fetchChats };
};

export const useCreateChat = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const { post } = useApi();

  const createChat = useCallback(
    async (expertId: number) => {
      setIsLoading(true);
      setError(null);

      try {
        const { id } = await post<Chat>("/chats", {
          expert_id: expertId,
        });
        router.push(`/chats/${id}`);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [post, router]
  );

  return { createChat, isLoading, error };
};

export const useGetChatById = (id: number) => {
  const [chat, setChat] = useState<Chat>();
  const [messages, setMessages] = useState<ChatMessage[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { get } = useApi();

  const getChat = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await get<Chat>(`/chats/${id}`);
      setChat(data);
      setMessages(data.messages);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [get, id]);

  useEffect(() => {
    getChat();
  }, [getChat]);

  return { chat, messages, isLoading, error, getChat };
};

export const useUpdateChat = (id: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const { put } = useApi();

  const updateChat = useCallback(
    async (title: string) => {
      setIsLoading(true);
      setError(null);
      try {
        await put(`/chats/${id}`, {
          title,
        });
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 30000);
        return () => clearTimeout(timer);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    },
    [put, id]
  );

  return { isLoading, error, updateChat };
};

export const useChatKnowledge = (id: number, defaultDocs: Document[]) => {
  const [documents, setDocuments] = useState<Document[]>(defaultDocs);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const { get, post, del } = useApi();

  const getDocuments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await get<Document[]>(`/chats/${id}/documents`);
      setDocuments(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [id, get]);

  useEffect(() => {
    getDocuments();
  }, [getDocuments]);

  const attachDocument = useCallback(
    async (documentId: number) => {
      setIsLoading(true);
      setError(null);
      try {
        await post(`/chats/${id}/documents/${documentId}`, {});
        getDocuments();
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [id, post, getDocuments]
  );

  const detachDocument = useCallback(
    async (documentId: number) => {
      setIsLoading(true);
      setError(null);
      try {
        await del(`/chats/${id}/documents/${documentId}`);
        getDocuments();
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [id, del, getDocuments]
  );

  return {
    documents,
    isLoading,
    error,
    getDocuments,
    attachDocument,
    detachDocument,
  };
};

export const useChatQuery = (id: number, items?: ChatMessage[]) => {
  const [chatItems, setChatItems] = useState<ChatMessage[]>(items ?? []);
  const [taskLog, setTaskLog] = useState<TaskNotification[]>([]);
  const [currentTask, setCurrentTask] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const { post } = useApi();

  const addToChatItems = (item: ChatMessage) => {
    setChatItems((prevChat) => [...prevChat, item]);
  };

  const askQuestion = useCallback(
    async (question: string) => {
      setCurrentTask(question);
      setError(null);

      try {
        const item = await post<ChatMessage>(`/chats/${id}/query`, {
          question,
        });
        addToChatItems(item);
      } catch (err) {
        setError(err as Error);
      } finally {
        setCurrentTask(null);
      }
    },
    [id, post]
  );

  const legalSimulator = useCallback(
    async (question: string) => {
      setCurrentTask(question);
      setError(null);

      try {
        const item = await post<ChatMessage>(`/chats/${id}/simulate`, {
          question,
        });
        addToChatItems(item);
      } catch (err) {
        setError(err as Error);
      } finally {
        setCurrentTask(null);
      }
    },
    [id, post]
  );

  const generateTask = useCallback(
    async (mode: string, prompt: string) => {
      setCurrentTask(prompt);
      setError(null);

      try {
        await post<ChatMessage>(`/chats/${id}/generate-${mode}`, {
          prompt,
        });
      } catch (err) {
        setError(err as Error);
        setCurrentTask(null);
      }
    },
    [id, post]
  );

  return {
    chatItems,
    currentTask,
    taskLog,
    error,
    askQuestion,
    legalSimulator,
    generateTask,
    addToChatItems,
    setCurrentTask,
    setTaskLog,
  };
};

export const useChatMediaURL = (id: number, objectKey: string) => {
  const [audioSrc, setAudioSrc] = useState<string | null>();
  const [activeId, setActiveId] = useState<number | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const { get } = useApi();

  const getPlaybackUrl = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { presigned_url } = await get<MediaURLResponse>(
        `/chats/${id}/playback-url?key=${encodeURIComponent(objectKey)}`
      );
      setAudioSrc(presigned_url);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [get, id, objectKey]);

  const getDownloadUrl = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { presigned_url } = await get<MediaURLResponse>(
        `/chats/${id}/download-url?key=${encodeURIComponent(objectKey)}`
      );

      const audioRes = await fetch(presigned_url);

      if (!audioRes.ok) {
        throw new Error("No se pudo descargar el archivo de audio.");
      }

      const blob = await audioRes.blob();
      const localUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = localUrl;
      link.download = objectKey.split("/").pop() || "audio_briefing.mp3";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(localUrl);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [get, id, objectKey]);

  return {
    audioSrc,
    activeId,
    isLoading,
    error,
    setActiveId,
    getPlaybackUrl,
    getDownloadUrl,
  };
};
