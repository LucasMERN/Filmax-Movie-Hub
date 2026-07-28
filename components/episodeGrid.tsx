'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TV, TvEpisode } from '@/types/api';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import BrokenImage from '@/assets/brokenImage.jpg';
import { getTvShowEpisodes } from '@/lib/api';

const EpisodeGrid = ({ mediaData, id }: { mediaData: TV; id: number }) => {
  const [activeSeason, setActiveSeason] = useState<string | undefined>(undefined);
  const [episodeActiveSeason, setEpisodeActiveSeason] = useState<number | null>(null);
  const [episodeData, setEpisodeData] = useState<TvEpisode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lastSeason = mediaData.seasons[mediaData.seasons.length - 1]?.name;
    setActiveSeason(lastSeason);
  }, [mediaData]);

  useEffect(() => {
    if (activeSeason) {
      const selectedSeason = mediaData.seasons.find((s) => s.name === activeSeason);
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
          console.error('Error fetching episodes:', error);
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
    <section className="gap-4 pt-8 container flex flex-col">
      <h3 className="text-2xl font-semibold tracking-widest text-white">Episodes</h3>
      <>
        <div className="gap-4 flex flex-col">
          <div className="gap-2 flex items-center">
            <Select
              defaultValue={activeSeason}
              value={activeSeason}
              onValueChange={(value) => setActiveSeason(value)}
            >
              <SelectTrigger className="text-white w-[120px] text-left">
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
              {mediaData?.seasons.find((season) => season?.name === activeSeason)?.episode_count ||
                '0'}{' '}
              Episodes
            </span>
          </div>
        </div>

        {loading ? (
          <div>Loading episodes...</div>
        ) : (
          <div className="gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid grid-cols-1">
            <>
              {episodeData &&
                episodeData?.length > 0 &&
                episodeData?.map((episode: TvEpisode) => (
                  <div
                    key={episode?.id}
                    className="group gap-2 p-4 flex flex-col transition-colors hover:bg-primary"
                  >
                    {episode?.still_path !== null ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w533_and_h300_bestv2/${episode?.still_path}`}
                        alt={`Thumbnail image for ${episode?.name}`}
                        width={300}
                        height={200}
                        className="aspect-video w-full"
                        loading="lazy"
                        unoptimized
                      />
                    ) : (
                      <Image
                        src={BrokenImage}
                        alt={`This Image is not available`}
                        width={300}
                        height={200}
                        className="aspect-video w-full"
                        loading="lazy"
                        unoptimized
                      />
                    )}
                    <div className="gap-2 flex">
                      <span className="dark-shadow font-bold group-hover:text-white text-primary transition-colors">
                        EP0{episode?.episode_number}
                      </span>
                      <h4 className="text-white">
                        {episode?.name.split('').length > 29
                          ? episode?.name.split('').slice(0, 30).join('') + '...'
                          : episode?.name}
                      </h4>
                    </div>
                    <p className="pt-4 text-sm text-white/60">{episode?.overview}</p>
                    <span className="text-sm text-white/20 group-hover:text-white/40 transition-colors">
                      {new Date(episode?.air_date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                ))}
            </>
          </div>
        )}
      </>
    </section>
  );
};

export default EpisodeGrid;
