"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/heroCarousel";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import BackgroundImage from "@/components/ui/backgroundImage";
import Link from "next/link";
import { Movie, TV } from "@/types/api";

const Hero = ({ data }: { data: Movie[] & TV[] }) => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(8);
  const [isImageVisible, setIsImageVisible] = useState(true);

  function handlePreviousClick() {
    setIsImageVisible(false);
    setTimeout(() => {
      setCurrentMovieIndex((prevIndex) =>
        prevIndex === 0 ? data.length - 1 : prevIndex - 1,
      );
      setIsImageVisible(true);
    }, 1000);
  }

  function handleNextClick() {
    setIsImageVisible(false);
    setTimeout(() => {
      setCurrentMovieIndex((prevIndex) =>
        prevIndex === data.length - 1 ? 0 : prevIndex + 1,
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
    data[currentMovieIndex]?.name ||
    data[currentMovieIndex]?.title ||
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
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${data[currentMovieIndex]?.backdrop_path})`,
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
        className="h-[675px] w-full bg-cover bg-center lg:h-[850px]"
      ></div>
      <div className="container relative mx-auto h-[650px] pt-36 text-3xl font-bold text-white lg:h-[790px] lg:text-6xl">
        <h1
          className="dark-shadow mb-4 tracking-widest"
          style={{
            opacity: isImageVisible ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        >
          {!data[currentMovieIndex]?.title
            ? data[currentMovieIndex]?.name
            : data[currentMovieIndex]?.title}
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
            {data[currentMovieIndex]?.vote_average} / 10
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
            {data && data[currentMovieIndex]
              ? truncateText(data[currentMovieIndex].overview, 120)
              : ""}
          </p>
          <Link
            href={`${data[currentMovieIndex]?.media_type === "movie" ? `movie/${data[currentMovieIndex]?.id}/${formattedTitle}` : `tv/${data[currentMovieIndex]?.id}/${formattedTitle}`}`}
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
            {data.map((movie: any, index: number) => {
              const formattedTitle = (movie?.name || movie?.title || "")
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
                        alt={`Poster image for ${movie?.title}`}
                        lazy="eager"
                      />
                    </Card>
                    {index == currentMovieIndex && (
                      <span className="dark-shadow break-words text-center text-base">
                        {!movie?.title ? movie?.name : movie?.title}
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
