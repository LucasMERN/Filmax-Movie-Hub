"use client";

import Hero from "@/Components/Hero";
import ProductCarousel from "@/Components/ProductCarousel";
import CallToAction from "@/Components/CallToAction";
import { getNewMovie, getPopular, getAnimated, getNewTV } from "@/lib/utils";
import { useState, useEffect } from "react";
import SearchFilter from "@/Components/SearchFilter";
import Link from "next/link";
import Loader from "@/Components/Loader";

export default function Dashboard() {
  const [newMovieData, setNewMovieData] = useState<any[]>([]);
  const [popularMovieData, setPopularMovieData] = useState<any[]>([]);
  const [animatedMovieData, setAnimatedMovieData] = useState<any[]>([]);
  const [newTVData, setNewTVData] = useState<any[]>([]);
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
            width="md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
          />
        </div>
        <div className="container pr-0">
          <CarouselHeader title={"Popular movies"} />
          <ProductCarousel
            mediaType="movie"
            data={popularMovieData}
            width="md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
          />
        </div>
        <CallToAction id={95396} color={"#007D4D"} mediaType={"tv"} />
        <div className="container pr-0">
          <CarouselHeader title={"New TV Shows"} />
          <ProductCarousel
            mediaType="tv"
            data={newTVData}
            width="md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
          />
        </div>
        <div className="container pr-0">
          <CarouselHeader title={"Animations"} />
          <ProductCarousel
            mediaType="movie"
            data={animatedMovieData}
            width="md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
          />
        </div>
      </div>
    </main>
  );
}

interface CarouselHeaderTypes {
  title: string;
}

const CarouselHeader = ({ title }: CarouselHeaderTypes) => {
  return (
    <div className="relative z-10 -mb-4 flex flex-row items-baseline gap-4 px-1 pr-8 text-white lg:pr-12">
      <h3 className="text-xl font-semibold">{title}</h3>
      <Link href="#" className="cursor-pointer text-sm font-extralight">
        View All
      </Link>
    </div>
  );
};
