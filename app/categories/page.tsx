"use client";

import Footer from "@/Components/Footer";
import Nav from "@/Components/Nav";
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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(new Array(8).fill(null));
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
    { src: actionVideo, poster: actionThumb.src, blurData: actionThumb.blurDataURL, margin: '', alignment: '', title:'Action', url: '/action' },
    { src: animatedVideo, poster: animatedThumb.src, blurData: animatedThumb.blurDataURL, margin: 'mt-12', alignment: '-mt-12', title:'Animated', url: '/animated' },
    { src: scifiVideo, poster: scifiThumb.src, blurData: scifiThumb.blurDataURL, margin: 'mt-24', alignment: '-mt-24', title:'Fantasy', url: '/fantasy' },
    { src: thrillerVideo, poster: thrillerThumb.src, blurData: thrillerThumb.blurDataURL, margin: 'mt-8', alignment: '-mt-8', title:'Thriller', url: '/thriller' },
    { src: dramaVideo, poster: dramaThumb.src, blurData: dramaThumb.blurDataURL, margin: '-mt-4', alignment: 'mt-4', title:'Drama', url: '/drama' },
    { src: crimeVideo, poster: crimeThumb.src, blurData: crimeThumb.blurDataURL, margin: 'mt-24', alignment: '-mt-24', title:'Crime', url: '/crime' },
    { src: comedyVideo, poster: comedyThumb.src, blurData: comedyThumb.blurDataURL, margin: 'mt-12', alignment: '-mt-12', title:'Comedy', url: '/comedy' },
    { src: horrorVideo, poster: horrorThumb.src, blurData: horrorThumb.blurDataURL, margin: '', alignment: '', title:'Horror', url: '/horror' },
  ];

  return (
    <main>
      <Nav />
      <section
        className={`${activeIndex !== null ? "lg:grid-cols-10" : "lg:grid-cols-8"} container grid gap-2 pt-48 transition-all`}
      >
        {videos.map((video, index) => (
          <Link
            key={index}
            href={video.url}
            className={`relative h-[500px] transition-all ${video.margin}
              ${activeIndex === index ? "col-span-3" : activeIndex !== null ? "col-span-1" : ""}
            `}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Video
              src={video.src}
              controls={false}
              autoPlay={false}
              muted
              className="absolute left-0 top-0 h-full w-full object-cover"
              // @ts-ignore
              ref={(el) => videoRefs.current[index] = el}
              poster={video.poster}
              blurDataURL={video.blurData}
            />
            <span className={`dark-shadow absolute top-1/2 ${video.alignment} w-full text-center text-xl font-semibold text-white`}>
              {video.title}
            </span>
          </Link>
        ))}
      </section>
      <Footer />
    </main>
  );
}
