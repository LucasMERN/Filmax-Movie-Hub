"use client";

import React, { useRef, useState, useCallback } from "react";
import Video from "next-video";
import actionVideo from "@/videos/action.mp4";
import animatedVideo from "@/videos/animated.mp4";
import comedyVideo from "@/videos/comedy.mp4";
import crimeVideo from "@/videos/crime.mp4";
import horrorVideo from "@/videos/horror.mp4";
import scifiVideo from "@/videos/sci-fi.mp4";
import thrillerVideo from "@/videos/thriller.mp4";
import dramaVideo from "@/videos/drama.mp4";
import actionThumb from "@/public/action.jpg";
import animatedThumb from "@/public/animated.jpg";
import comedyThumb from "@/public/comedy.jpg";
import crimeThumb from "@/public/crime.jpg";
import horrorThumb from "@/public/horror.jpg";
import scifiThumb from "@/public/scifi.jpg";
import dramaThumb from "@/public/drama.jpg";
import thrillerThumb from "@/public/thriller.jpg";
import Link from "next/link";

export default function Categories() {
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
    if (videoRefs.current[index]) {
      videoRefs.current[index].play();
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (activeIndex !== null && videoRefs.current[activeIndex]) {
      videoRefs.current[activeIndex].pause();
      videoRefs.current[activeIndex].load();
    }
    setActiveIndex(null);
  }, [activeIndex]);

  const videos = [
    {
      src: actionVideo,
      poster: actionThumb.src,
      blurData: actionThumb.blurDataURL,
      margin: "",
      alignment: "",
      title: "Action",
      url: "/categories/28%2C12/action",
    },
    {
      src: animatedVideo,
      poster: animatedThumb.src,
      blurData: animatedThumb.blurDataURL,
      margin: "md:mt-12",
      alignment: "-md:mt-12",
      title: "Animated",
      url: "/categories/16/animated",
    },
    {
      src: scifiVideo,
      poster: scifiThumb.src,
      blurData: scifiThumb.blurDataURL,
      margin: "md:mt-24",
      alignment: "-md:mt-24",
      title: "Fantasy",
      url: "/categories/14%2C878/fantasy",
    },
    {
      src: thrillerVideo,
      poster: thrillerThumb.src,
      blurData: thrillerThumb.blurDataURL,
      margin: "md:mt-8",
      alignment: "-md:mt-8",
      title: "Thriller",
      url: "/categories/53/thriller",
    },
    {
      src: dramaVideo,
      poster: dramaThumb.src,
      blurData: dramaThumb.blurDataURL,
      margin: "md:-mt-4",
      alignment: "md:mt-4",
      title: "Drama",
      url: "/categories/18/drama",
    },
    {
      src: crimeVideo,
      poster: crimeThumb.src,
      blurData: crimeThumb.blurDataURL,
      margin: "md:mt-24",
      alignment: "md:-mt-24",
      title: "Crime",
      url: "/categories/80/crime",
    },
    {
      src: comedyVideo,
      poster: comedyThumb.src,
      blurData: comedyThumb.blurDataURL,
      margin: "md:mt-12",
      alignment: "md:-mt-12",
      title: "Comedy",
      url: "/categories/35/comedy",
    },
    {
      src: horrorVideo,
      poster: horrorThumb.src,
      blurData: horrorThumb.blurDataURL,
      margin: "",
      alignment: "",
      title: "Horror",
      url: "/categories/27/horror",
    },
  ];

  return (
    <section className="container flex flex-col justify-between gap-4 pt-24 md:flex-row md:gap-0 md:pt-48">
      {videos.map((video, index) => (
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
}
