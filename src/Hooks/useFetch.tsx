interface UseFetchReturn<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  refetch: () => void;
}

import { useState, useEffect, useCallback } from "react";

export const useFetch = <T,>(url: string): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error("Erreur http");
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      controller.abort();
    };
  }, [refetchTrigger, url]);

  const refetch = useCallback(() => {
    setRefetchTrigger((prev) => {
      return prev + 1;
    });
  }, []);

  return { data, error, loading, refetch };
};
