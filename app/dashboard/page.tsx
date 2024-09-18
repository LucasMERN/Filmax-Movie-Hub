"use client";

import Hero from "@/Components/Hero";
import ProductCarousel from "@/Components/ProductCarousel";
import CallToAction from "@/Components/CallToAction";
import { getNewMovie, getPopular, getAnimated, getNewTV } from "@/lib/utils";
import { useState, useEffect } from "react";
import SearchFilter from "@/Components/SearchFilter";
import Loader from "@/Components/Loader";
import CarouselHeader from "@/Components/CarouselHeader";
import { Movie, TV } from "@/lib/types";

export default function Dashboard() {
  const [newMovieData, setNewMovieData] = useState<Movie[]>([]);
  const [popularMovieData, setPopularMovieData] = useState<Movie[]>([]);
  const [animatedMovieData, setAnimatedMovieData] = useState<Movie[]>([]);
  const [newTVData, setNewTVData] = useState<TV[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const today = new Date();
  const formattedDate = today.toISOString().substring(0, 10);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const newMovies = await getNewMovie("movie", 2);
        const popularMovies = await getPopular("movie", 1);
        const animatedMovies = await getAnimated("movie", 1);
        const newTV = await getNewTV("tv", 2, formattedDate);
        if (Array.isArray(newMovies?.results)) {
          setNewMovieData(newMovies.results);
          setPopularMovieData(popularMovies.results);
          setAnimatedMovieData(animatedMovies.results);
          setNewTVData(newTV.results);
        } else {
          setError("No data available");
        }
      } catch (error) {
        console.error("Error fetching Promo Data:", error);
        setError("Failed to fetch data");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    fetchData();
  }, [formattedDate]);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

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
            mediaType="movie"
            data={newMovieData}
            width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
          />
        </div>
        <div className="container pr-0">
          <CarouselHeader title={"Popular Movies"} />
          <ProductCarousel
            mediaType="movie"
            data={popularMovieData}
            width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
          />
        </div>
        <CallToAction id={95396} color={"#007D4D"} mediaType={"tv"} />
        <div className="container pr-0">
          <CarouselHeader title={"New TV Shows"} />
          <ProductCarousel
            mediaType="tv"
            data={newTVData}
            width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
          />
        </div>
        <div className="container pr-0">
          <CarouselHeader title={"Animated Movies"} />
          <ProductCarousel
            mediaType="movie"
            data={animatedMovieData}
            width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
          />
        </div>
      </div>
    </main>
  );
}
