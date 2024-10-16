import React from "react";
import Image from "next/image";
import { TvEpisode } from "@/types/api";
import BrokenImage from "@/public/brokenImage.jpg";

type EpisodesProps = {
  episodes: TvEpisode[];
  id: number;
};

const Episodes = ({ episodes, id }: EpisodesProps) => {
  try {
    return (
      <>
        {episodes &&
          episodes?.length > 0 &&
          episodes?.map((episode: TvEpisode) => (
            <div
              key={episode?.id}
              className="group flex flex-col gap-2 p-4 transition-colors hover:bg-primary"
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
              <div className="flex gap-2">
                <span className="dark-shadow font-bold text-primary transition-colors group-hover:text-white">
                  EP0{episode?.episode_number}
                </span>
                <h4 className="text-white">
                  {episode?.name.split("").length > 29
                    ? episode?.name.split("").slice(0, 30).join("") + "..."
                    : episode?.name}
                </h4>
              </div>
              <p className="pt-4 text-sm text-white/60">{episode?.overview}</p>
              <span className="text-sm text-white/20 transition-colors group-hover:text-white/40">
                {new Date(episode?.air_date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          ))}
      </>
    );
  } catch (error) {
    console.error("Error fetching episodes:", error);
  }
};

export default Episodes;
