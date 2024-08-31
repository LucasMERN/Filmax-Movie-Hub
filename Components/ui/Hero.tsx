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
import { Card, CardContent } from "@/Components/ui/card";

const Hero = () => {
  const [top10, setTop10] = useState<any[]>([]);

  useEffect(() => {
    const fetchTop10 = async () => {
      try {
        const movies = await getTop10('https://api.themoviedb.org/3/trending/all/week?language=en-US');

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
      <div className="container mx-auto flex flex-col gap-4 pt-36 text-3xl lg:text-6xl font-bold text-white">
        <h1 className="dark-shadow tracking-widest">
          {!top10[currentMovieIndex]?.original_title ? top10[currentMovieIndex]?.original_name : top10[currentMovieIndex]?.original_title}
        </h1>
        <div className="flex flex-row items-center gap-4">
          <span className="h-fit rounded bg-amber-700 px-4 py-1 text-xl text-black">
            IMDB
          </span>
          <span className="dark-shadow text-2xl font-medium">
            {top10[currentMovieIndex]?.vote_average} / 10
          </span>
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
            {top10.map((movie: any, index: number) => (
              <CarouselItem key={index} className="basis-1/3">
                <div
                  className={`${index === currentMovieIndex ? "elevated mt-6 flex flex-col items-center gap-2 p-1" : "unelevated mt-6 flex flex-col items-center gap-2 p-1"}`}
                >
                  <Card
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.poster_path})`,
                      backgroundPosition: "center",
                    }}
                    className="w-full h-96 bg-cover bg-center shadow-lg border-4 border-white"
                  >
                    <CardContent />
                  </Card>
                  {index == currentMovieIndex ? (
                    <span className="dark-shadow break-words text-center text-lg">
                      {!movie?.original_title ? movie?.original_name : movie?.original_title}
                    </span>
                  ) : (
                    <span className="dark-shadow break-words text-center text-lg opacity-0">
                      {!movie?.original_title ? movie?.original_name : movie?.original_title}
                    </span>
                  )}
                </div>
              </CarouselItem>
            ))}
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
