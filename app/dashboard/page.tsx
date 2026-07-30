import CallToAction from '@/components/call-to-action';
import CarouselHeader from '@/components/carousel-header';
import Hero from '@/components/hero';
import ProductCarousel from '@/components/product-carousel';
import SearchFilter from '@/components/search-filter';
import { getAnimated, getList, getNewMovie, getNewTV, getPopular, getTop10 } from '@/lib/api';
import { baseUrl } from '@/lib/base-url';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Filmax | Home',
  description: 'Home page for Filmax Cinema Hub',
};

export default async function Dashboard() {
  const canonical = `${baseUrl}/dashboard`;

  try {
    const data = await getTop10();
    const newMovieData = await getNewMovie('movie', 2);
    const popularData = await getList('8675842');
    const weirdWorldData = await getList('8675855');
    const scifiData = await getList('8675853');
    const sadData = await getList('8675848');
    const rewindRewatchData = await getList('8675844');
    const coldCaseThrillersData = await getList('8675862');
    const funnyData = await getList('8675849');
    const whiteKnuckleData = await getList('8675841');
    const goodTVData = await getList('8675847');
    const mindBenderData = await getList('8675861');
    const horrorData = await getList('8675843');
    const classicData = await getList('8675846');
    const actionData = await getList('8675863');
    const animatedMovieData = await getAnimated('movie', 1);

    const today = new Date();
    const formattedDate = today.toISOString().substring(0, 10);

    const newTVData = await getNewTV('tv', 2, formattedDate);

    if (
      !data ||
      !newMovieData ||
      !popularData ||
      !animatedMovieData ||
      !newTVData ||
      !weirdWorldData ||
      !scifiData ||
      !sadData ||
      !rewindRewatchData ||
      !coldCaseThrillersData ||
      !funnyData ||
      !whiteKnuckleData ||
      !goodTVData ||
      !mindBenderData ||
      !horrorData ||
      !classicData ||
      !actionData
    ) {
      return (
        <>
          <head>
            <link rel="canonical" href={canonical} />
          </head>
          <div>No data available</div>
        </>
      );
    }

    return (
      <>
        <head>
          <link rel="canonical" href={canonical} />
        </head>
        <section className="min-h-screen overflow-hidden">
          <Hero data={data?.results.slice(0, 10)} />
          <div className="flex flex-col items-center gap-20">
            <div className="container">
              <SearchFilter />
            </div>
            <div className="container pr-0">
              <CarouselHeader title="New Movies On Filmax!" link="/trending" />
              <ProductCarousel
                mediaType="movie"
                data={newMovieData?.results}
                width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              />
            </div>
            <div className="container pr-0">
              <CarouselHeader title="The GOAT List" link="/movies" />
              <ProductCarousel
                data={popularData?.items}
                width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              />
            </div>
            <CallToAction id={'95396'} color="#00b2be" mediaType={'tv'} />
            <div className="container pr-0">
              <CarouselHeader title="New Shows On Filmax!" link="/shows" />
              <ProductCarousel
                mediaType="tv"
                data={newTVData?.results}
                width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              />
            </div>
            <div className="container pr-0">
              <CarouselHeader title="When The World Went Weird..." link="/movies" />
              <ProductCarousel
                data={weirdWorldData?.items}
                width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              />
            </div>
            <div className="container pr-0">
              <CarouselHeader title="Slow-Burn Sci-Fi" link="/movies" />
              <ProductCarousel
                data={scifiData?.items}
                width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              />
            </div>
            <CallToAction id={'969681'} color="#898b16" mediaType={'movie'} />
            <div className="container pr-0">
              <CarouselHeader title="Absolute Tear Jerkers" link="/movies" />
              <ProductCarousel
                data={sadData?.items}
                width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              />
            </div>
            <div className="container pr-0">
              <CarouselHeader title="Cold Case Thrillers" link="/movies" />
              <ProductCarousel
                data={coldCaseThrillersData?.items}
                width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              />
            </div>
            <div className="container pr-0">
              <CarouselHeader title="White-Knuckle Watchlist" link="/movies" />
              <ProductCarousel
                data={whiteKnuckleData?.items}
                width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              />
            </div>
            <div className="container pr-0">
              <CarouselHeader title="Animated Movies" link="categories/16/animated" />
              <ProductCarousel
                mediaType="movie"
                data={animatedMovieData?.results}
                width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              />
            </div>
            <CallToAction id={'1423191'} color="#8b1616" mediaType={'movie'} />
            <div className="container pr-0">
              <CarouselHeader title="Action Packed All-Stars" link="/movies" />
              <ProductCarousel
                data={actionData?.items}
                width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              />
            </div>
            <div className="container pr-0">
              <CarouselHeader title="Guilty Pleasure Laughs" link="/movies" />
              <ProductCarousel
                data={funnyData?.items}
                width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              />
            </div>
            <div className="container pr-0">
              <CarouselHeader title="Rewind & Rewatch" link="/movies" />
              <ProductCarousel
                data={rewindRewatchData?.items}
                width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              />
            </div>
            <div className="container pr-0">
              <CarouselHeader title="Mind-Bending Mania" link="/movies" />
              <ProductCarousel
                data={mindBenderData?.items}
                width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              />
            </div>
            <CallToAction id={'215943'} color="#0090b4" mediaType={'tv'} />
            <div className="container pr-0">
              <CarouselHeader title="One More Episode..." link="/movies" />
              <ProductCarousel
                data={goodTVData?.items}
                width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              />
            </div>
            <div className="container pr-0">
              <CarouselHeader title="Fright Night Favorites" link="/movies" />
              <ProductCarousel
                data={horrorData?.items}
                width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              />
            </div>
            <div className="container pr-0">
              <CarouselHeader title="Oldies, but Goldies" link="/movies" />
              <ProductCarousel
                data={classicData?.items}
                width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              />
            </div>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error('Error in Test component:', error);
    return <div>Error</div>;
  }
}
