import CallToAction from "@/components/callToAction";
import CarouselHeader from "@/components/carouselHeader";
import Hero from "@/components/hero";
import ProductCarousel from "@/components/productCarousel";
import SearchFilter from "@/components/searchFilter";
import {
  getAnimated,
  getNewMovie,
  getNewTV,
  getPopular,
  getTop10,
} from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filmax | Home",
  description: "Home page for Filmax Cinema Hub",
};

export default async function Dashboard() {
  try {
    const data = await getTop10();
    const newMovieData = await getNewMovie("movie", 2);
    const popularMovieData = await getPopular("movie", 1);
    const animatedMovieData = await getAnimated("movie", 1);

    const today = new Date();
    const formattedDate = today.toISOString().substring(0, 10);

    const newTVData = await getNewTV("tv", 2, formattedDate);

    if (
      !data ||
      !newMovieData ||
      !popularMovieData ||
      !animatedMovieData ||
      !newTVData
    ) {
      return <div>No data available</div>;
    }

    return (
      <main className="min-h-screen overflow-hidden">
        <Hero data={data?.results.slice(0, 10)} />
        <div className="flex flex-col items-center gap-20">
          <div className="container">
            <SearchFilter />
          </div>
          <div className="container pr-0">
            <CarouselHeader title="New Movies" link="/trending" />
            <ProductCarousel
              mediaType="movie"
              data={newMovieData?.results}
              width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
            />
          </div>
          <div className="container pr-0">
            <CarouselHeader title="Popular Movies" link="/movies" />
            <ProductCarousel
              mediaType="movie"
              data={popularMovieData?.results}
              width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
            />
          </div>
          <CallToAction id={95396} color="#007D4D" mediaType={"tv"} />
          <div className="container pr-0">
            <CarouselHeader title="New TV Shows" link="/shows" />
            <ProductCarousel
              mediaType="tv"
              data={newTVData?.results}
              width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
            />
          </div>
          <div className="container pr-0">
            <CarouselHeader
              title="Animated Movies"
              link="categories/16/animated"
            />
            <ProductCarousel
              mediaType="movie"
              data={animatedMovieData?.results}
              width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
            />
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error in Test component:", error);
    return <div>Error</div>;
  }
}
