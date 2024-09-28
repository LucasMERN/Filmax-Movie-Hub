"use client";

import CarouselHeader from "@/components/carouselHeader";
import ProductCarousel from "@/components/productCarousel";
import { getNewMovie, getPopular, getAnimated, getNewTV } from "@/lib/api";
import { Movie, TV } from "@/types/api";
import Loader from "@/components/loader";
import React, { useState, useEffect } from "react";

type DashboardCarouselsProps = {
    children?: React.ReactNode;
}

const DashboardCarousels = ({children}: DashboardCarouselsProps) => {
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
    <>
      <div className="container pr-0">
        <CarouselHeader title="New Movies" link="/movies/" />
        <ProductCarousel
          mediaType="movie"
          data={newMovieData}
          width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
        />
      </div>
      <div className="container pr-0">
        <CarouselHeader title="Popular Movies" link="/movies" />
        <ProductCarousel
          mediaType="movie"
          data={popularMovieData}
          width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
        />
      </div>
      {children}
      <div className="container pr-0">
        <CarouselHeader title="New TV Shows" link="/shows" />
        <ProductCarousel
          mediaType="tv"
          data={newTVData}
          width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
        />
      </div>
      <div className="container pr-0">
        <CarouselHeader title="Animated Movies" link="categories/16/animated" />
        <ProductCarousel
          mediaType="movie"
          data={animatedMovieData}
          width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
        />
      </div>
    </>
  );
};

export default DashboardCarousels;
