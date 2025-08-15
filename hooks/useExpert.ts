import { useState, useEffect, useCallback } from "react";
import { useApi } from "./useApi";
import { Document, Expert } from "@/lib/types";

export const useFetchExperts = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { get } = useApi();

  const fetchExperts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await get<Expert[]>("/experts");
      setExperts(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [get]);

  useEffect(() => {
    fetchExperts();
  }, [fetchExperts]);

  return { experts, isLoading, error, fetchExperts };
};

export const useCreateOrUpdateExpert = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const { post, put } = useApi();

  const saveExpert = useCallback(
    async (expertData: Omit<Expert, "id">, id?: number | null) => {
      setIsLoading(true);
      setError(null);

      try {
        let savedExpert: Expert;

        if (id) {
          savedExpert = await put<Expert>(`/experts/${id}`, expertData);
        } else {
          savedExpert = await post<Expert>("/experts", expertData);
        }

        return savedExpert;
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [post, put]
  );

  return { saveExpert, isLoading, error };
};

export const useGetExpertById = (id: number) => {
  const [expert, setExpert] = useState<Expert>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { get } = useApi();

  const getExpert = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await get<Expert>(`/experts/${id}`);
      setExpert(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [get, id]);

  useEffect(() => {
    getExpert();
  }, [getExpert]);

  return { expert, isLoading, error, getExpert };
};

export const useExpertKnowledge = (id: number, defaultDocs: Document[]) => {
  const [documents, setDocuments] = useState<Document[]>(defaultDocs);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const { get, post, del } = useApi();

  const getDocuments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await get<Document[]>(`/experts/${id}/documents`);
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
        await post(`/experts/${id}/documents/${documentId}`, {});
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
        await del(`/experts/${id}/documents/${documentId}`);
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
