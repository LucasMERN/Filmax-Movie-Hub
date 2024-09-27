import { MediaData } from "@/types/api";
import React, { useEffect, useState } from "react";

type ApiResponse<T extends MediaData> = {
  results: T[];
};

type ApiFunction<T extends MediaData> = (
  mediaType: "movie" | "tv",
  page: number,
) => Promise<ApiResponse<T>>;

export function useMultiMediaData<T extends MediaData>(
  apiFn: ApiFunction<T>,
  mediaType: "movie" | "tv",
  page: number,
) {
  const [data, setData] = useState<T[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await apiFn(mediaType, page);
        if (Array.isArray(result.results)) {
          setData(result.results);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiFn, mediaType, page]);

  return { data, isLoading, error };
}
