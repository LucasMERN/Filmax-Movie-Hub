import { useState, useEffect } from "react";
import { getTvShowEpisodes } from "@/lib/api";
import { TvEpisode, TV } from "@/types/api";

export function useEpisodeData(
  mediaData: TV | undefined,
  activeSeason: string | undefined,
) {
  const [episodeData, setEpisodeData] = useState<TvEpisode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisodes = async (showId: number, seasonNumber: number) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getTvShowEpisodes(showId, seasonNumber);
        setEpisodeData(data.episodes);
      } catch (error) {
        console.error("Error fetching episodes:", error);
        setError("Failed to fetch episode data");
      } finally {
        setIsLoading(false);
      }
    };

    if (mediaData && activeSeason) {
      const selectedSeason = mediaData.seasons.find(
        (season) => season.name === activeSeason,
      );
      if (selectedSeason) {
        fetchEpisodes(mediaData.id, selectedSeason.season_number);
      }
    }
  }, [mediaData, activeSeason]);

  return { episodeData, isLoading, error };
}
