import { getYouTubeVideo } from "@/lib/api";
import { YouTubeVideo } from "@/types/api";
import React, { useEffect, useState } from "react";

export const useYoutubeData = (mediaType: "movie" | "tv", id: number) => {
  const [youtubeData, setYoutubeData] = useState<YouTubeVideo[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getYouTubeVideo(id, mediaType);
        if (data !== null) {
          setYoutubeData(
            data.results.filter((data: { name: string }) =>
              data.name.split(" ").includes("Trailer"),
            ),
          );
        }
      } catch (error) {
        console.error("Error fetching Youtube data:", error);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, mediaType]);

  return { youtubeData, isLoading, error };
};
