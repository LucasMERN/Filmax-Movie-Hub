import { getRecommended } from "@/lib/api";
import { MediaData } from "@/types/api";
import React, { useEffect, useState } from "react";

export const useRecommendedData = (mediaType: "movie" | "tv", id: number) => {
  const [recommendedData, setRecommendedData] = useState<MediaData[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getRecommended(id, mediaType);
        if (Array.isArray(data.results)) {
          setRecommendedData(data.results);
        }
      } catch (error) {
        console.error("Error fetching Recommended data:", error);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, mediaType]);

  return { recommendedData, isLoading, error };
};
