"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Video from "next-video";
import Link from "next/link";
import clsx from "clsx";
import VideoTilesSkeleton from "@/components/skeletons/videoTilesSkeleton";
import { Asset } from "next-video/dist/assets.js";

type VideoTilesProps = {
  data: {
    src: Asset;
    poster: string;
    blurData: string | undefined;
    margin: string;
    alignment: string;
    title: string;
    url: string;
  }[];
};

const VideoTiles = ({ data }: VideoTilesProps) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(
    new Array(data.length).fill(null),
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleMouseEnter = useCallback((index: number) => {
    setActiveIndex(index);
    videoRefs.current.forEach((video, i) => {
      if (i !== index && video) {
        video.pause();
      }
    });
    videoRefs.current[index]?.play();
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (activeIndex !== null) {
      videoRefs.current[activeIndex]?.pause();
      videoRefs.current[activeIndex]?.load();
    }
    setActiveIndex(null);
  }, [activeIndex]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative">
      <VideoTilesSkeleton className={clsx(isLoading ? "" : "hidden")} />
      <section
        className={clsx(
          "container flex flex-row flex-wrap gap-3 pt-24 md:flex-nowrap md:justify-between md:gap-0 md:pt-48",
          isLoading ? "opacity-0" : "opacity-100",
          "transition-opacity",
        )}
      >
        {data.map((video, index) => (
          <Link
            key={index}
            href={video.url}
            className={clsx(
              "relative h-[500px] w-[30%] transition-all duration-300 ease-in-out",
              video.margin,
              activeIndex === null
                ? "h-[12%] md:w-[12%]"
                : activeIndex === index
                  ? "h-[25%] md:w-[25%]"
                  : "h-[10%] md:w-[10%]",
            )}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Video
              src={video.src}
              controls={false}
              autoPlay={false}
              muted
              className="absolute left-0 top-0 h-full w-full object-cover transition-all duration-300 ease-in-out"
              ref={(el: HTMLVideoElement | null) => {
                videoRefs.current[index] = el;
              }}
              poster={video.poster}
              blurDataURL={video.blurData}
            />
            <span
              className={clsx(
                "dark-shadow absolute top-1/2 w-full text-center text-sm font-semibold text-white transition-all duration-300 ease-in-out md:text-xl",
                video.alignment,
              )}
            >
              {video.title}
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default VideoTiles;
