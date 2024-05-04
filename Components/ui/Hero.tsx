'use client'

import Image from "next/image";
import { getTop10 } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel";
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/Components/ui/card";

const Hero = () => {
  const [top10, setTop10] = useState<any[]>([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    const fetchTop10 = async () => {
      try {
        const movies = await getTop10();

        if(Array.isArray(movies?.results)){
          setTop10(movies.results.slice(0, 10));
        } else {
          console.error('Data is not an array:', movies);
        }
      }
      catch(error) {
        console.error('Error fetching top10:', error);
      }
    };
    fetchTop10();

  }, []);

  function handlePreviousClick() {
    setCurrentMovieIndex((prevIndex) => (prevIndex === 0 ? top10.length-1 : prevIndex - 1));
  }
  
  function handleNextClick() {
    setCurrentMovieIndex((prevIndex) => (prevIndex === top10.length-1 ? 0 : prevIndex + 1));
  }

  return (
    <div
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${top10[currentMovieIndex]?.backdrop_path})`, backgroundPosition: "center" }}
      className="w-full h-[1000px] bg-cover bg-center"
    > 
      <div className="container mx-auto pt-60 text-6xl text-white font-bold flex flex-col gap-6">
        <h1>{top10[currentMovieIndex]?.original_title}</h1>
        <div className="flex flex-row gap-4 items-center">
          <span className="px-4 py-1 bg-amber-700 text-black text-xl rounded h-fit">
            IMDB
          </span>
          <span className="text-3xl font-medium">{top10[currentMovieIndex]?.vote_average} / 10</span>
        </div>
        <Carousel
          opts={{
            align: "end",
            direction: "rtl",
            loop: true,
            duration: 40,
          }}
          className="w-full mt-20"
        >
          <CarouselContent>
            {top10.map((movie: any, index: number) => (
              <CarouselItem key={index} className="basis-1/3">
                <div className="p-1">
                  <Card style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.poster_path})`, backgroundPosition: "center" }} className="bg-cover bg-center w-full">
                    <CardContent>
                      {index}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}

export default Hero;