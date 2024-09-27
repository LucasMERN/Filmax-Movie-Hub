import { getContentRating } from "@/lib/api";
import { ContentRating } from "@/types/api";
import React, { useEffect, useState } from "react";

export const useContentRatingData = (mediaType: "tv", id: number) => {
  const [contentRatingData, setContentRatingData] = useState<ContentRating[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const data = await getContentRating(mediaType, id);
        if (Array.isArray(data.results)) {
          setContentRatingData(
            data.results.filter(
              (data: { iso_3166_1: string }) => data.iso_3166_1 === "US",
            ),
          );
        }
      } catch (error) {
        console.error("Error fetching Content Rating data:", error);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, mediaType]);

  return { contentRatingData, isLoading, error };
};
