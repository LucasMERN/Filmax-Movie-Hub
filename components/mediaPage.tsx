'use client';

import React, { useRef } from 'react';
import EpisodeGrid from '@/components/episodeGrid';
import { Cast, ContentRating, ExternalID, Movie, ReleaseDate, TV, YouTubeVideo } from '@/types/api';
import ProductCarousel from '@/components/productCarousel';
import {
  Facebook,
  TwitterIcon,
  Instagram,
  Clapperboard,
  Link2,
  Dot,
  Plus,
  ChevronsRight,
} from 'lucide-react';
import { RadialChart } from '@/components/radialChart';
import BackgroundImage from '@/components/ui/backgroundImage';
import { badgeVariants } from '@/components/ui/badge';
import { Badge } from '@/components/ui/badge';
import { Card, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { AddToWatchlist } from '@/components/watchlistButton';
import { useUser } from '@clerk/nextjs';

function MediaPage({
  mediaType,
  id,
  mediaData,
  cast,
  recommendedShows,
  recommendedMovies,
  tvRatingData,
  movieRatingData,
  youtubeData,
  externalData,
}: {
  mediaType: 'movie' | 'tv';
  id: number;
  mediaData: TV & Movie;
  cast: Cast[];
  recommendedShows?: TV[];
  recommendedMovies?: Movie[];
  tvRatingData?: ContentRating[];
  movieRatingData?: ReleaseDate[];
  youtubeData: YouTubeVideo[];
  externalData: ExternalID;
}) {
  const userId = useUser();
  const castSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToCast = () => {
    if (castSectionRef.current) {
      castSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formattedTitle =
    mediaType === 'tv'
      ? mediaData?.name
      : mediaData?.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-');

  let rating;

  switch (mediaType) {
    case 'tv':
      if (tvRatingData !== undefined) {
        tvRatingData.filter((item) => {
          item.iso_3166_1 === 'US' ? (rating = item.rating) : undefined;
        });
      }
      break;
    case 'movie':
      if (movieRatingData !== undefined) {
        movieRatingData.filter((item) => {
          item.iso_3166_1 === 'US' ? (rating = item.release_dates[0].certification) : undefined;
        });
      }
      break;
    default:
      rating = undefined;
  }

  let releaseYear;

  switch (mediaType) {
    case 'tv':
      const firstAirDate = mediaData.first_air_date?.split('-')[0] || 'N/A';
      const lastAirDate = mediaData.last_air_date?.split('-')[0] || 'Present';
      releaseYear = `${firstAirDate} - ${lastAirDate}`;
      break;
    case 'movie':
      if (movieRatingData !== undefined) {
        releaseYear = movieRatingData[0]?.release_dates?.[0]?.release_date?.split('-')[0];
      }
      break;
    default:
      releaseYear = 'N/A';
  }

  const trailerVideo = youtubeData.filter((data: { name: string }) =>
    data?.name.split(' ').includes('Trailer')
  );

  return (
    <>
      <section className="pb-14 pt-16 relative border-b-2 border-primary">
        <div
          className="left-0 top-0 absolute z-[9] h-full w-full"
          style={{
            background: 'linear-gradient(to top, black 0%, transparent 100%)',
          }}
        ></div>
        <BackgroundImage
          src={`https://image.tmdb.org/t/p/original/${mediaData?.backdrop_path}`}
          alt={`Backdrop image for ${mediaType === 'movie' ? mediaData?.title : mediaData?.name}`}
          lazy="eager"
          priority
        />
        <section className="mb-14 gap-6 border-white pb-14 pt-24 relative z-10 container flex flex-col border-b">
          <span className="dark-shadow -mb-6 text-sm font-semibold tracking-widest text-white/60 uppercase">
            {mediaType === 'tv' ? 'tv series' : 'movie'}
          </span>
          <h1 className="dark-shadow text-2xl font-bold tracking-wider text-white md:text-4xl">
            {mediaType === 'movie' ? mediaData?.title : mediaData?.name}
          </h1>
          <div className="gap-4 text-white flex items-center">
            <Link
              className={`${externalData?.facebook_id ? '' : 'hidden'}`}
              href={`https://www.facebook.com/${externalData?.facebook_id}`}
              target="_blank"
            >
              <Facebook />
            </Link>
            <Link
              href={`https://www.x.com/${externalData?.twitter_id}`}
              className={`${externalData?.twitter_id ? '' : 'hidden'}`}
              target="_blank"
            >
              <TwitterIcon />
            </Link>
            <Link
              className={`${externalData?.instagram_id ? '' : 'hidden'}`}
              href={`https://www.instagram.com/${externalData?.instagram_id}`}
              target="_blank"
            >
              <Instagram />
            </Link>
            <Link
              href={`https://www.imdb.com/title/${externalData?.imdb_id}`}
              className={`${externalData?.imdb_id ? '' : 'hidden'}`}
              target="_blank"
            >
              <Clapperboard />
            </Link>
            <Link
              href={`${mediaData?.homepage}`}
              className={`${mediaData?.homepage ? '' : 'hidden'}`}
              target="_blank"
            >
              <Link2 />
            </Link>
          </div>
          <div className="gap-2 relative flex flex-row items-center">
            <Badge
              variant="outline"
              className="mr-2 border-white text-sm font-medium text-white shadow-lg w-fit rounded-md"
            >
              {rating || 'NR'}
            </Badge>
            <span className="dark-shadow text-sm font-semibold text-white/60">{releaseYear}</span>
            <Dot size={20} className="-mx-2 text-white/60" />
            <ul className="gap-1 md:flex hidden flex-row">
              {cast.slice(0, 3).map((person: any, index: number) => (
                <li
                  key={index}
                  className="dark-shadow text-sm font-semibold text-white/60 whitespace-nowrap"
                >
                  <Link href={`/person/${person?.id}/${person?.name}`} className="hover:text-white">
                    {index === 2 ? person?.name : `${person?.name}, `}
                  </Link>
                </li>
              ))}
            </ul>
            <span className="dark-shadow text-white/60 md:block mb-[3px] hidden h-[1.2rem] overflow-hidden">
              |
            </span>
            <button
              onClick={scrollToCast}
              className="dark-shadow group group gap-1 text-sm font-semibold text-white/60 hover:text-white flex items-center underline-offset-2 hover:underline"
            >
              See Full Cast{' '}
              <ChevronsRight
                size={20}
                className="dark-shadow group-hover:animate-wiggle group-hover:text-white underline-offset-2 transition-transform group-hover:underline"
              />
            </button>
            {mediaData?.vote_count > 0 && (
              <RadialChart
                voteCount={mediaData?.vote_count}
                voteAverage={mediaData?.vote_average}
              />
            )}
          </div>
          <AddToWatchlist
            item={{
              title: mediaType === 'movie' ? mediaData?.title : mediaData?.name,
              poster_image: mediaData?.poster_path,
              link: `/${mediaType}/${mediaData?.id}/${formattedTitle}`,
            }}
            userId={userId.user?.id}
          />
        </section>
        <section className="gap-8 lg:flex-row lg:gap-6 relative z-10 container flex w-full flex-col">
          <Image
            className="border-white shadow-2xl lg:block hidden rounded-lg border text-card-foreground transition-transform hover:scale-105 hover:rotate-3"
            width={175}
            height={250}
            src={`https://image.tmdb.org/t/p/w342/${mediaData?.poster_path}`}
            alt={`Poster image for ${mediaType === 'movie' ? mediaData?.title : mediaData?.name}`}
            priority
            loading="eager"
            unoptimized
          />
          <div className="gap-3 md:w-1/2 flex flex-col">
            <h2 className="dark-shadow -mb-2 text-lg font-semibold tracking-widest text-white">
              Description
            </h2>
            <p className="dark-shadow dark-shadow text-white/60 md:w-2/3">{mediaData?.overview}</p>
            <div className="gap-2 lg:mt-4 flex">
              {mediaData?.genres.map((name: any, index: number) => (
                <Link
                  key={index}
                  href={`/categories/${name?.id}/${name?.name}`}
                  className={`${badgeVariants({ variant: 'outline' })} border-white px-3 py-1 text-sm font-medium text-white shadow-lg w-fit transition-all hover:bg-primary`}
                >
                  {name?.name}
                </Link>
              ))}
            </div>
          </div>
          {trailerVideo !== null && trailerVideo.length > 0 && (
            <Card className="gap-2 flex flex-col">
              <CardTitle className="dark-shadow p-0 text-lg font-semibold tracking-widest text-white">
                Watch Trailer
              </CardTitle>
              <iframe
                src={`https://www.youtube.com/embed/${trailerVideo[0]?.key}`}
                loading="eager"
                title={trailerVideo[0]?.name}
                className="aspect-video border-white shadow-lg md:w-1/2 lg:w-[400px] w-full rounded-lg border object-contain"
              />
            </Card>
          )}
        </section>
      </section>
      {mediaType === 'tv' && <EpisodeGrid id={id} mediaData={mediaData} />}
      <div className="gap-20 pt-16 flex flex-col items-center overflow-hidden" ref={castSectionRef}>
        <div className="pr-0 container">
          <div className="-mb-4 gap-4 px-1 pr-8 text-white lg:pr-12 relative z-10 flex flex-row items-baseline">
            <h3 className="text-xl font-semibold">Cast</h3>
          </div>
          <ProductCarousel
            mediaType="person"
            loop={false}
            data={cast}
            width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
          />
        </div>
      </div>
      {(recommendedShows && recommendedShows.length > 0) ||
      (recommendedMovies && recommendedMovies.length > 0) ? (
        <div className="gap-20 pt-16 flex flex-col items-center overflow-hidden">
          <div className="pr-0 container">
            <div className="-mb-4 gap-4 px-1 pr-8 text-white lg:pr-12 relative z-10 flex flex-row items-baseline">
              <h3 className="text-xl font-semibold">More Like This</h3>
            </div>
            <ProductCarousel
              mediaType={mediaType}
              data={mediaType === 'tv' ? recommendedShows : recommendedMovies}
              width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default MediaPage;
