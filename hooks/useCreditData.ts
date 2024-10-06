import { getCredits } from "@/lib/api";
import { Cast } from "@/types/api";
import React, { useEffect, useState } from "react";

export const useCreditData = (mediaType: "movie" | "tv", id: number) => {
  const [creditData, setCreditData] = useState<Cast[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCredits(id, mediaType);
        setCreditData(data?.cast);
      } catch (error) {
        console.error("Error fetching Credit data:", error);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, mediaType]);

  return { creditData, isLoading, error };
};
