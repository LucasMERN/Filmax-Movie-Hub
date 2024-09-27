import { getRelease } from "@/lib/api";
import { ReleaseDate } from "@/types/api";
import React, { useEffect, useState } from "react";

export const useReleaseData = (mediaType: "movie", id: number) => {
  const [releaseData, setReleaseData] = useState<ReleaseDate[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getRelease(mediaType, id);
        if (Array.isArray(data.results)) {
          setReleaseData(
            data.results.filter(
              (data: { iso_3166_1: string }) => data.iso_3166_1 === "US",
            ),
          );
        }
      } catch (error) {
        console.error("Error fetching Release data:", error);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, mediaType]);

  return { releaseData, isLoading, error };
};
