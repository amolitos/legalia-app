import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Chat, ChatMessage, ChatQuery, Document } from "@/lib/types";
import { ChatItem } from "@/components/chats/ChatMessages";
import { useApi } from "./useApi";

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
  const [messages, setMessages] = useState<ChatItem[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { get } = useApi();

  const getChat = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await get<Chat>(`/chats/${id}`);
      setChat(data);
      const messages = data.messages.flatMap((item) => [
        { type: "question", message: item.question },
        { type: "answer", message: item.answer },
      ]);
      setMessages(messages);
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

export const useChatQuery = (id: number, items?: ChatItem[]) => {
  const [chatItems, setChatItems] = useState<ChatItem[]>(items ?? []);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const { post } = useApi();

  const addToChatItems = (type: string, message: string) => {
    setChatItems((prevChat) => [
      ...prevChat,
      {
        type,
        message,
      },
    ]);
  };

  const askQuestion = useCallback(
    async (query: ChatQuery) => {
      setIsLoading(true);
      setError(null);
      addToChatItems("question", query.question);

      try {
        const { answer } = await post<ChatMessage>(`/chats/${id}/query`, query);
        addToChatItems("answer", answer);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [id, post]
  );

  const createDocument = useCallback(
    async (query: ChatQuery) => {
      setIsLoading(true);
      setError(null);
      addToChatItems("question", query.question);

      try {
        const { answer } = await post<ChatMessage>(
          `/chats/${id}/generate-document`,
          { prompt: query.question }
        );
        addToChatItems("answer", answer);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [id, post]
  );

  return { chatItems, isLoading, error, askQuestion, createDocument };
};
