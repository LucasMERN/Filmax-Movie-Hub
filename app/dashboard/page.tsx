"use client"

import Hero from "@/Components/ui/Hero";
import FilterGrid from "@/Components/ui/FilterGrid";
import ProductCarousel from "@/Components/ui/ProductCarousel";
import CallToAction from "@/Components/ui/CallToAction";
import { getNewMovies, getPopular, getAnimations, getNewTV } from "@/lib/utils";
import useFetchData from "@/hooks/useFetchData"

export default function Dashboard() {
  const newMovieList = useFetchData(getNewMovies);
  const popularList = useFetchData(getPopular);
  const animationList = useFetchData(getAnimations);
  const newTVList = useFetchData(getNewTV);
  
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="flex flex-col gap-10 items-center">
        <ProductCarousel data={newMovieList}/>
        <ProductCarousel data={popularList}/>
        <CallToAction />
        <ProductCarousel data={newTVList}/>
        <ProductCarousel data={animationList}/>
      </div>
    </main>
  );
}
