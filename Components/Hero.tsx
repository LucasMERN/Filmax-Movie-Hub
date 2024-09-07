"use client";

import { getTop10 } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/HeroCarousel";
import React, { useState, useEffect } from "react";
import { Card } from "@/Components/ui/card";
import BackgroundImage from "@/Components/ui/BackgroundImage";
import Link from "next/link";

type HeroProps = {
  mediaType?: "movie" | "tv";
};

const Hero = ({ mediaType = "movie" }: HeroProps) => {
  const [top10, setTop10] = useState<any[]>([]);

  useEffect(() => {
    const fetchTop10 = async () => {
      try {
        const movies = await getTop10();

        if (Array.isArray(movies?.results)) {
          setTop10(movies.results.slice(0, 10));
        } else {
          console.error("Data is not an array:", movies);
        }
      } catch (error) {
        console.error("Error fetching top10:", error);
      }
    };
    fetchTop10();
  }, []);

  const [currentMovieIndex, setCurrentMovieIndex] = useState(8);
  const [isImageVisible, setIsImageVisible] = useState(true);

  function handlePreviousClick() {
    setIsImageVisible(false);
    setTimeout(() => {
      setCurrentMovieIndex((prevIndex) =>
        prevIndex === 0 ? top10.length - 1 : prevIndex - 1,
      );
      setIsImageVisible(true);
    }, 1000);
  }

  function handleNextClick() {
    setIsImageVisible(false);
    setTimeout(() => {
      setCurrentMovieIndex((prevIndex) =>
        prevIndex === top10.length - 1 ? 0 : prevIndex + 1,
      );
      setIsImageVisible(true);
    }, 1000);
  }

  function truncateText(text: string, maxLength: number) {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  }

  const formattedTitle = (
    top10[currentMovieIndex]?.original_name ||
    top10[currentMovieIndex]?.title ||
    ""
  )
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-");

  return (
    <>
      <div
        onTransitionEnd={() => setIsImageVisible(true)}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${top10[currentMovieIndex]?.backdrop_path})`,
          backgroundPosition: "center",
          opacity: isImageVisible ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
        className="h-[800px] w-full bg-cover bg-center"
      ></div>
      <div className="container relative mx-auto h-[750px] pt-36 text-3xl font-bold text-white lg:text-6xl">
        <h1
          className="dark-shadow mb-4 tracking-widest"
          style={{
            opacity: isImageVisible ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        >
          {!top10[currentMovieIndex]?.original_title
            ? top10[currentMovieIndex]?.original_name
            : top10[currentMovieIndex]?.original_title}
        </h1>
        <div className="flex flex-row items-center gap-4">
          <span className="h-fit rounded bg-amber-700 px-4 py-1 text-xl text-black">
            IMDB
          </span>
          <span
            className="dark-shadow text-2xl font-medium"
            style={{
              opacity: isImageVisible ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          >
            {top10[currentMovieIndex]?.vote_average} / 10
          </span>
        </div>
        <div
          className="-m-4 -mb-72 mt-16 flex flex-col gap-4 rounded-2xl bg-black/60 p-4 sm:w-1/2 lg:hidden"
          style={{
            opacity: isImageVisible ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        >
          <p className="dark-shadow text-sm">
            {top10 && top10[currentMovieIndex]
              ? truncateText(top10[currentMovieIndex].overview, 120)
              : ""}
          </p>
          <Link
            href={`${top10[currentMovieIndex]?.media_type === "movie" ? `movie/${top10[currentMovieIndex]?.id}/${formattedTitle}` : `tv/${top10[currentMovieIndex]?.id}/${formattedTitle}`}`}
            className="hover:bg-secondary/80 inline-flex h-8 w-fit items-center justify-center whitespace-nowrap rounded-md bg-white px-4 text-base font-semibold text-secondary-foreground transition-colors"
          >
            Explore
          </Link>
        </div>
        <Carousel
          opts={{
            align: "end",
            direction: "rtl",
            loop: true,
            duration: 40,
          }}
          className="mt-4 w-full"
        >
          <CarouselContent className="invisible lg:visible">
            {top10.map((movie: any, index: number) => {
              const formattedTitle = (
                movie?.original_name ||
                movie?.title ||
                ""
              )
                .toLowerCase()
                .replace(/[^\w\s]/gi, "")
                .replace(/\s+/g, "-");

              return (
                <CarouselItem
                  href={`${movie.media_type === "movie" ? `movie/${movie?.id}/${formattedTitle}` : `tv/${movie?.id}/${formattedTitle}`}`}
                  key={index}
                  className="basis-1/3"
                >
                  <div
                    className={`${index === currentMovieIndex ? "elevated mt-6 flex flex-col items-center gap-2 p-1" : "unelevated mt-6 flex flex-col items-center gap-2 p-1"}`}
                  >
                    <Card className="relative h-96 w-full overflow-hidden border-4 border-white bg-cover bg-center shadow-lg">
                      <BackgroundImage
                        src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movie?.poster_path}`}
                        alt={movie?.overview}
                        lazy="eager"
                      />
                    </Card>
                    {index == currentMovieIndex ? (
                      <span className="dark-shadow break-words text-center text-lg">
                        {!movie?.original_title
                          ? movie?.original_name
                          : movie?.original_title}
                      </span>
                    ) : (
                      <span className="dark-shadow break-words text-center text-lg opacity-0">
                        {!movie?.original_title
                          ? movie?.original_name
                          : movie?.original_title}
                      </span>
                    )}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div onClick={handlePreviousClick}>
            <CarouselPrevious />
          </div>
          <div onClick={handleNextClick}>
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default Hero;
