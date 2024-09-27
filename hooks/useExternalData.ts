import { getExternalId } from "@/lib/api";
import { ExternalID } from "@/types/api";
import React, { useEffect, useState } from "react";

export const useExternalData = (mediaType: "movie" | "tv", id: number) => {
  const [externalData, setExternalData] = useState<ExternalID>();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getExternalId(id, mediaType);
        if (data !== null) {
          setExternalData(data);
        }
      } catch (error) {
        console.error("Error fetching External data:", error);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, mediaType]);

  return { externalData, isLoading, error };
};
