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

const FilterGrid = () => {
  const [top10, setTop10] = useState<any[]>([]);

  useEffect(() => {
    const fetchTop10 = async () => {
      try {
        const movies = await getTop10("aADS");

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

  return (
    <Carousel
      opts={{
        align: "end",
        direction: "rtl",
        loop: true,
        duration: 40,
      }}
      className="mt-8 w-full"
    >
      <CarouselContent>
        {top10.map((movie: any, index: number) => (
          <CarouselItem key={index} className="basis-1/3">
            <div className="mt-6 flex flex-col items-center gap-2 p-1">
              <Card className="relative h-96 w-full overflow-hidden bg-cover bg-center shadow-lg">
                <BackgroundImage
                  src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                  alt={`https://image.tmdb.org/t/p/original/${movie?.overview}`}
                />
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default FilterGrid;
