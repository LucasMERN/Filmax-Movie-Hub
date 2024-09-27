import { getSingle } from "@/lib/api";
import { MediaData } from "@/types/api";
import React, { useEffect, useState } from "react";

export const useSingleTVData = (mediaType: "movie" | "tv", id: number) => {
  const [mediaData, setMediaData] = useState<MediaData>();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getSingle(mediaType, id);
        if (data !== null) {
          setMediaData(data);
        }
      } catch (error) {
        console.error("Error fetching single media data:", error);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, mediaType]);

  return { mediaData, isLoading, error };
};
