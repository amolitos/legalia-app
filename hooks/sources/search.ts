"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

export const useSourcesSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const handleSearch = async (searchTerm: string | undefined) => {
    setLoading(true);
    setError(null);

    const res = await fetch(
      `/api/proxy/sources/search?search_term=${searchTerm}`
    );

    if (res.status === 401) return redirect("/login");
    if (!res.ok) setError(`Error ${res.status}: ${res.statusText}`);

    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  return {
    results,
    loading,
    error,
    handleSearch,
  };
};
