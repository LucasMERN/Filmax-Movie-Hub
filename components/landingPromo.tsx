"use client";

import { getSingle } from "@/lib/api";
import React, { useState, useEffect } from "react";
import BackgroundImage from "@/components/ui/backgroundImage";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Movie } from "@/types/api";
import { Skeleton } from "./ui/skeleton";

const LandingPromo = ({
  id1,
  id2,
  id3,
  color,
}: {
  id1: number;
  id2: number;
  id3: number;
  color: string;
}) => {
  const [top10, setTop10] = useState<Movie[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTop10 = async () => {
      try {
        setIsLoading(true);
        const movieIDs = [id1, id2, id3];

        const movies = await Promise.all(
          movieIDs.map((id) => getSingle("movie", id)),
        );

        setTop10(movies);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching top10:", error);
      }
    };
    fetchTop10();
  }, [id1, id2, id3]);

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
    <>
      {isLoading ? (
        <div className="relative h-[450px] w-full overflow-hidden lg:h-[700px]">
          <div
            className="absolute inset-0 z-10 h-full w-full object-cover"
            style={{
              opacity: isImageVisible ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          />
          <div
            className="absolute inset-0 z-10"
            style={{
              background: `linear-gradient(-145deg, ${color} 50%, transparent 50.1%)`,
            }}
          ></div>
          <div className="container relative z-20 mx-auto flex h-full flex-col justify-between py-20 transition-opacity duration-1000 ease-in-out md:pl-32 lg:py-28 xl:py-36 xl:pl-64">
            <Skeleton
              className="h-9 w-64 font-extrabold tracking-widest text-white/70 lg:text-6xl"
              style={{
                translate: isImageVisible ? "0%" : "0% -200%",
                opacity: isImageVisible ? 1 : 0,
                transition: "all .5s ease-in-out",
              }}
            ></Skeleton>
            <div className="flex flex-col">
              {carousel[activeIndex].tagline.map((line, index) => (
                <Skeleton
                  key={index}
                  className="mb-2 h-5 w-48 font-bold text-white"
                  style={{
                    translate: isImageVisible ? "0%" : "0% -200%",
                    opacity: isImageVisible ? 1 : 0,
                    transition: "all .5s ease-in-out",
                  }}
                />
              ))}
              <Skeleton className="mb-4 mt-4 h-12 w-36 !font-medium lg:mt-8" />
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
            ></div>
          </div>
        </div>
      ) : (
        <div className="relative h-[450px] w-full overflow-hidden lg:h-[700px]">
          <Image
            alt={`Backdrop image for ${top10[carousel[activeIndex].activeImage]?.title}`}
            decoding="async"
            className="absolute inset-0 z-10 h-full w-full object-cover grayscale"
            fill
            priority
            loading="eager"
            src={`https://image.tmdb.org/t/p/original/${top10[carousel[activeIndex].activeImage]?.backdrop_path}`}
            style={{
              opacity: isImageVisible ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          />
          <div
            className="absolute inset-0 z-10"
            style={{
              background: `linear-gradient(-145deg, ${color} 50%, transparent 50.1%)`,
            }}
          ></div>
          <div className="container relative z-20 mx-auto flex h-full flex-col justify-between py-20 transition-opacity duration-1000 ease-in-out md:pl-32 lg:py-28 xl:py-36 xl:pl-64">
            <h3
              className="text-3xl font-extrabold tracking-widest text-white/70 lg:text-6xl"
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
                asChild
              >
                <Link href="/dashboard">ENTER SITE</Link>
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
                src={`https://image.tmdb.org/t/p/original/${top10[carousel[activeIndex].activeImage]?.backdrop_path}`}
                alt={`Poster image for ${top10[carousel[activeIndex].activeImage]?.title}`}
                lazy="eager"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPromo;
