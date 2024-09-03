"use client";

import Hero from "@/Components/Hero";
import ProductCarousel from "@/Components/ProductCarousel";
import CallToAction from "@/Components/CallToAction";
import { getNewMovies, getPopular, getAnimations, getNewTV } from "@/lib/utils";
import { useState, useEffect } from "react";
import SearchFilter from "@/Components/SearchFilter";
import Link from "next/link";
import Promo from "@/Components/Promo";

export default function Dashboard() {
  const [newMovieData, setNewMovieData] = useState<any[]>([]);
  const [popularMovieData, setPopularMovieData] = useState<any[]>([]);
  const [animatedMovieData, setAnimatedMovieData] = useState<any[]>([]);
  const [newTVData, setNewTVData] = useState<any[]>([]);

  const today = new Date();
  const formattedDate = today.toISOString().substring(0, 10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newMovies = await getNewMovies(
          `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2`,
        );
        const popularMovies = await getPopular(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        );
        const animatedMovies = await getAnimations(
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.asc&vote_count.gte=100&with_genres=16&with_original_language=en",
        );
        const newTV = await getNewTV(
          `https://api.themoviedb.org/3/discover/tv?&include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&first_air_date.gte=2022-11-01&first_air_date.lte=${formattedDate}&with_original_language=en`,
        );

        if (Array.isArray(newMovies?.results)) {
          setNewMovieData(newMovies.results);
          setPopularMovieData(popularMovies.results);
          setAnimatedMovieData(animatedMovies.results);
          setNewTVData(newTV.results);
        } else {
          console.error("Data is not an array:", newMovies);
        }
      } catch (error) {
        console.error("Error fetching top10:", error);
      }
    };
    fetchData();
  }, [formattedDate]);

  return (
    <main className="min-h-screen overflow-hidden">
      <Hero />
      <div className="flex flex-col items-center gap-20">
        <div className="container">
          <SearchFilter />
        </div>
        <div className="container pr-0">
          <CarouselHeader title={"New Movies"} />
          <ProductCarousel
            data={newMovieData}
            width="md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
          />
        </div>
        <div className="container pr-0">
          <CarouselHeader title={"Popular movies"} />
          <ProductCarousel
            data={popularMovieData}
            width="md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
          />
        </div>
        <CallToAction id={"95396"} color={"#007D4D"} media={"tv"} />
        <div className="container pr-0">
          <CarouselHeader title={"New TV Shows"} />
          <ProductCarousel
            data={newTVData}
            width="md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
          />
        </div>
        <div className="container pr-0">
          <CarouselHeader title={"Animations"} />
          <ProductCarousel
            data={animatedMovieData}
            width="md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
          />
        </div>
        <Promo id="693134" color="#161616" media="movie"/>
      </div>
    </main>
  );
}

interface CarouselHeaderTypes {
  title: string;
}

const CarouselHeader = ({ title }: CarouselHeaderTypes) => {
  return (
    <div className="relative z-10 -mb-4 flex flex-row items-baseline justify-between px-1 pr-8 text-white lg:pr-12">
      <h3 className="text-xl font-semibold">{title}</h3>
      <Link href="#" className="cursor-pointer text-sm font-extralight">
        View All
      </Link>
    </div>
  );
};
