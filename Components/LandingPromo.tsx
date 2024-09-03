"use client";

import { getTop10 } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import BackgroundImage from "@/Components/ui/BackgroundImage";
import Image from "next/image";
import { Button } from "./ui/Button";

const LandingPromo = () => {
  const [top10, setTop10] = useState<any[]>([]);

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

  const [currentMovieIndex, setCurrentMovieIndex] = useState(2);
  const [isImageVisible, setIsImageVisible] = useState(true);

  return (
    <div className="relative h-[700px] w-full">
      <Image
        alt="backdrop image"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 z-10 h-full w-full object-cover grayscale"
        fill
        src={`https://image.tmdb.org/t/p/original/${top10[currentMovieIndex]?.backdrop_path}`}
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(-145deg, rgba(139, 0, 0, 0.57) 50%, transparent 50%)",
        }}
      ></div>
      <div className="container relative z-20 mx-auto flex h-full flex-col justify-between py-28">
        <h3 className="text-6xl font-extrabold tracking-widest text-white/50">
          SEE WHAT'S NEXT
        </h3>
        <div className="flex flex-col">
          <h4 className="text-2xl font-bold text-white">WATCH ANYTIME.</h4>
          <h4 className="text-2xl font-bold text-white">FROM ANYWHERE.</h4>
          <Button variant="secondary" className="mb-4 mt-8 w-fit !font-medium">
            JOIN FREE
          </Button>
        </div>
      </div>
      <div className="absolute right-36 top-[9rem] z-[11]">
        <div className="relative h-[27rem] w-[800px] overflow-hidden">
          <BackgroundImage
            src={`https://image.tmdb.org/t/p/original/${top10[currentMovieIndex]?.poster_path}`}
            alt={`https://image.tmdb.org/t/p/original/${top10[currentMovieIndex]?.overview}`}
            lazy="eager"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPromo;
