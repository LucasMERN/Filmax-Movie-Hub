"use client";

import { getTop10 } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import BackgroundImage from "@/Components/ui/BackgroundImage";
import Image from "next/image";
import { Button } from "@/Components/ui/Button";

const LandingPromo = () => {
  const [top10, setTop10] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isImageVisible, setIsImageVisible] = useState(true);

  useEffect(() => {
    const fetchTop10 = async () => {
      try {
        const movies = await getTop10(
          "https://api.themoviedb.org/3/trending/all/week?language=en-US",
        );

        if (Array.isArray(movies?.results)) {
          setTop10(movies.results.slice(0, 3));
        } else {
          console.error("Data is not an array:", movies);
        }
      } catch (error) {
        console.error("Error fetching top10:", error);
      }
    };
    fetchTop10();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsImageVisible(false);
      setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
        setIsImageVisible(true);
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const carousel = [
    {
      id: 0,
      headline: "SEE WHAT'S NEXT",
      tagline: ["WATCH ANYTIME.", "FROM ANYWHERE."],
      activeImage: 0,
    },
    {
      id: 1,
      headline: "WATCH FROM ANYWHERE",
      tagline: ["SMART TVS, PLAYSTATION.", "XBOX, APPLE TV, AND MORE."],
      activeImage: 1,
    },
    {
      id: 2,
      headline: "GET STARTED",
      tagline: ["YOU WANT IT?", "WE GOT IT!"],
      activeImage: 2,
    },
  ];

  return (
    <div className="relative h-[450px] w-full overflow-hidden lg:h-[700px]">
      <Image
        alt="backdrop image"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 z-10 h-full w-full object-cover grayscale transition-all duration-1000 ease-in-out"
        fill
        src={`https://image.tmdb.org/t/p/original/${top10[carousel[activeIndex].activeImage]?.backdrop_path}`}
        style={{
          opacity: isImageVisible ? 1 : 0,
          transition: "opacity 1s ease-in-out",
        }}
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(-145deg, rgba(139, 0, 0, 0.57) 50%, transparent 50.1%)",
        }}
      ></div>
      <div className="container relative z-20 mx-auto flex h-full flex-col justify-between py-20 transition-opacity duration-1000 ease-in-out lg:py-28 xl:py-36">
        <h3
          className="text-3xl font-extrabold tracking-widest text-white/50 lg:text-6xl"
          style={{
            translate: isImageVisible ? "0%" : "0% -200%",
            opacity: isImageVisible ? 1 : 0,
            transition: "all .5s ease-in-out",
          }}
        >
          {carousel[activeIndex].headline}
        </h3>
        <div className="flex flex-col">
          {carousel[activeIndex].tagline.map((line, index) => (
            <h4
              key={index}
              className="text-xl font-bold text-white"
              style={{
                translate: isImageVisible ? "0%" : "0% -200%",
                opacity: isImageVisible ? 1 : 0,
                transition: "all .5s ease-in-out",
              }}
            >
              {line} <br />
            </h4>
          ))}
          <Button
            variant="secondary"
            className="mb-4 mt-4 w-fit !font-medium lg:mt-8"
          >
            JOIN FREE
          </Button>
        </div>
      </div>
      <div className="absolute -right-24 top-24 z-[11] md:right-12 lg:right-36 lg:top-[9rem]">
        <div
          className="relative h-52 w-96 overflow-hidden lg:h-[27rem] lg:w-[800px]"
          style={{
            translate: isImageVisible ? "0%" : "50% 0%",
            opacity: isImageVisible ? 1 : 0,
            transition: "all .5s ease-in-out",
          }}
        >
          <BackgroundImage
            src={`https://image.tmdb.org/t/p/original/${top10[carousel[activeIndex].activeImage]?.poster_path}`}
            alt={`https://image.tmdb.org/t/p/original/${top10[carousel[activeIndex].activeImage]?.overview}`}
            lazy="eager"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPromo;
