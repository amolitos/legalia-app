import { useCallback, useState } from "react";
import { SourceResult } from "@/lib/types";
import { useApi } from "./useApi";

export const useSourceSearch = () => {
  const [results, setResults] = useState<SourceResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const { get } = useApi();

  const search = useCallback(
    async (searchTerm: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await get<SourceResult[]>(
          `sources/search?search_term=${searchTerm}`
        );
        setResults(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [get]
  );

  return { results, isLoading, error, search };
};
