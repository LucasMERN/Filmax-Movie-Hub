"use client"

import Hero from "@/Components/ui/Hero";
import FilterGrid from "@/Components/ui/FilterGrid";
import ProductCarousel from "@/Components/ui/ProductCarousel";
import CallToAction from "@/Components/ui/CallToAction";
import { getNewMovies, getPopular, getAnimations, getNewTV } from "@/lib/utils";
import { useState, useEffect } from "react";
import SearchFilter from "@/Components/SearchFilter";

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

        const newMovies = await getNewMovies(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2`);
        const popularMovies = await getPopular('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1');
        const animatedMovies = await getAnimations('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.asc&vote_count.gte=100&with_genres=16&with_original_language=en');
        const newTV = await getNewTV(`https://api.themoviedb.org/3/discover/tv?&include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&first_air_date.gte=2022-11-01&first_air_date.lte=${formattedDate}&with_original_language=en`);

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

  interface CarouselHeaderTypes {
    title: string
  }

  const CarouselHeader = ({title}: CarouselHeaderTypes) => {
    return (
      <div className="text-white px-1 flex flex-row justify-between items-baseline w-[93.5%] -mb-4 container">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="text-sm font-extralight">View All</span>
      </div>
    )
  }
  
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="flex flex-col gap-20 items-center -mt-6">
        <div className="container">
          <SearchFilter />
        </div>
        <div>
          <CarouselHeader title={'New Movies'} />
          <ProductCarousel data={newMovieData} />
        </div>
        <div>
          <CarouselHeader title={'Popular movies'} />
          <ProductCarousel data={popularMovieData}/>
        </div>
        <CallToAction id={'95396'} color={'#007D4D'} media={'tv'}/>
        <div>
          <CarouselHeader title={'New TV Shows'} />
          <ProductCarousel data={newTVData}/>
        </div>
        <div>
          <CarouselHeader title={'Animations'} />
          <ProductCarousel data={animatedMovieData}/>
        </div>
      </div>
    </main>
  );
}
