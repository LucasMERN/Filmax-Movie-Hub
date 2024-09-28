"use client";

import Video from "next-video";
import { Asset } from "next-video/dist/assets.js";
import Link from "next/link";
import { useRef, useState, useCallback } from "react";

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
    new Array(8).fill(null),
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
  return (
    <section className="container flex flex-col justify-between gap-4 pt-24 md:flex-row md:gap-0 md:pt-48">
      {data.map((video: any, index: number) => (
        <Link
          key={index}
          href={video.url}
          className={`relative w-full transition-all duration-300 ease-in-out md:h-[500px] ${video.margin}
              ${
                activeIndex === null
                  ? "h-[12%] w-full md:w-[12%]"
                  : activeIndex === index
                    ? "h-[25%] w-full md:w-[25%]"
                    : "h-[10%] w-full md:w-[10%]"
              }
            `}
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
            className={`dark-shadow absolute top-1/2 ${video.alignment} w-full text-center text-xl font-semibold text-white transition-all duration-300 ease-in-out`}
          >
            {video.title}
          </span>
        </Link>
      ))}
    </section>
  );
};

export default VideoTiles;
