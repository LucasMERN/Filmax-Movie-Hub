"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TV, TvEpisode } from "@/types/api";
import React, { useEffect, useState } from "react";
import Episodes from "@/components/episodes";
import { getTvShowEpisodes } from "@/lib/api";

function EpisodeSelect({ mediaData, id }: { mediaData: TV; id: number }) {
  const [activeSeason, setActiveSeason] = useState<string | undefined>(
    undefined,
  );
  const [episodeActiveSeason, setEpisodeActiveSeason] = useState<number | null>(
    null,
  );
  const [episodeData, setEpisodeData] = useState<TvEpisode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lastSeason = mediaData.seasons[mediaData.seasons.length - 1]?.name;
    setActiveSeason(lastSeason);
  }, [mediaData]);

  useEffect(() => {
    if (activeSeason) {
      const selectedSeason = mediaData.seasons.find(
        (s) => s.name === activeSeason,
      );
      if (selectedSeason) {
        setEpisodeActiveSeason(selectedSeason.season_number);
      }
    }
  }, [mediaData, activeSeason]);

  useEffect(() => {
    async function fetchEpisodes() {
      if (episodeActiveSeason !== null) {
        try {
          const episodes = await getTvShowEpisodes(id, episodeActiveSeason);
          setEpisodeData(episodes?.episodes);
        } catch (error) {
          console.error("Error fetching episodes:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchEpisodes();
  }, [mediaData, id, episodeActiveSeason]);

  if (!mediaData) {
    return <div>Loading media data...</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Select
            defaultValue={activeSeason}
            value={activeSeason}
            onValueChange={(value) => setActiveSeason(value)}
          >
            <SelectTrigger className="w-[120px] text-left text-white">
              <SelectValue>{activeSeason || `Select Season`}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {mediaData?.seasons.map((season, index) => (
                  <SelectItem key={index} value={season?.name}>
                    {season?.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <span className="text-white/60">
            {mediaData?.seasons.find((season) => season?.name === activeSeason)
              ?.episode_count || "0"}{" "}
            Episodes
          </span>
        </div>
      </div>

      {loading ? (
        <div>Loading episodes...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <Episodes id={id} episodes={episodeData} />
        </div>
      )}
    </>
  );
}

export default EpisodeSelect;
