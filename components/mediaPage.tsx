"use client";

import React, { useRef } from "react";
import EpisodeGrid from "@/components/episodeGrid";
import {
  Cast,
  ContentRating,
  ExternalID,
  Movie,
  ReleaseDate,
  TV,
  YouTubeVideo,
} from "@/types/api";
import ProductCarousel from "@/components/productCarousel";
import {
  Facebook,
  TwitterIcon,
  Instagram,
  Clapperboard,
  Link2,
  Dot,
  Plus,
  ChevronsRight,
} from "lucide-react";
import { RadialChart } from "@/components/radialChart";
import BackgroundImage from "@/components/ui/backgroundImage";
import { badgeVariants } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { AddToWatchlist } from "@/components/watchlistButton";
import { useUser } from "@clerk/nextjs";

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
  mediaType: "movie" | "tv";
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
      castSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formattedTitle =
    mediaType === "tv"
      ? mediaData?.name
      : mediaData?.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-");

  let rating;

  switch (mediaType) {
    case "tv":
      if (tvRatingData !== undefined) {
        tvRatingData.filter((item) => {
          item.iso_3166_1 === "US" ? (rating = item.rating) : undefined;
        });
      }
      break;
    case "movie":
      if (movieRatingData !== undefined) {
        movieRatingData.filter((item) => {
          item.iso_3166_1 === "US"
            ? (rating = item.release_dates[0].certification)
            : undefined;
        });
      }
      break;
    default:
      rating = undefined;
  }

  let releaseYear;

  switch (mediaType) {
    case "tv":
      const firstAirDate = mediaData.first_air_date?.split("-")[0] || "N/A";
      const lastAirDate = mediaData.last_air_date?.split("-")[0] || "Present";
      releaseYear = `${firstAirDate} - ${lastAirDate}`;
      break;
    case "movie":
      if (movieRatingData !== undefined) {
        releaseYear =
          movieRatingData[0]?.release_dates?.[0]?.release_date?.split("-")[0];
      }
      break;
    default:
      releaseYear = "N/A";
  }

  const trailerVideo = youtubeData.filter((data: { name: string }) =>
    data?.name.split(" ").includes("Trailer"),
  );

  return (
    <>
      <section className="relative border-b-2 border-primary pb-14 pt-16">
        <div
          className="absolute left-0 top-0 z-[9] h-full w-full"
          style={{
            background: "linear-gradient(to top, black 0%, transparent 100%)",
          }}
        ></div>
        <BackgroundImage
          src={`https://image.tmdb.org/t/p/original/${mediaData?.backdrop_path}`}
          alt={`Backdrop image for ${mediaType === "movie" ? mediaData?.title : mediaData?.name}`}
          lazy="eager"
          priority
        />
        <section className="container relative z-10 mb-14 flex flex-col gap-6 border-b border-white pb-14 pt-24">
          <span className="dark-shadow -mb-6 text-sm font-semibold uppercase tracking-widest text-white/60">
            {mediaType === "tv" ? "tv series" : "movie"}
          </span>
          <h1 className="dark-shadow text-2xl font-bold tracking-wider text-white md:text-4xl">
            {mediaType === "movie" ? mediaData?.title : mediaData?.name}
          </h1>
          <div className="flex items-center gap-4 text-white">
            <Link
              className={`${externalData?.facebook_id ? "" : "hidden"}`}
              href={`https://www.facebook.com/${externalData?.facebook_id}`}
              target="_blank"
            >
              <Facebook />
            </Link>
            <Link
              href={`https://www.x.com/${externalData?.twitter_id}`}
              className={`${externalData?.twitter_id ? "" : "hidden"}`}
              target="_blank"
            >
              <TwitterIcon />
            </Link>
            <Link
              className={`${externalData?.instagram_id ? "" : "hidden"}`}
              href={`https://www.instagram.com/${externalData?.instagram_id}`}
              target="_blank"
            >
              <Instagram />
            </Link>
            <Link
              href={`https://www.imdb.com/title/${externalData?.imdb_id}`}
              className={`${externalData?.imdb_id ? "" : "hidden"}`}
              target="_blank"
            >
              <Clapperboard />
            </Link>
            <Link
              href={`${mediaData?.homepage}`}
              className={`${mediaData?.homepage ? "" : "hidden"}`}
              target="_blank"
            >
              <Link2 />
            </Link>
          </div>
          <div className="relative flex flex-row items-center gap-2">
            <Badge
              variant="outline"
              className="mr-2 w-fit rounded-md border-white text-sm font-medium text-white shadow-lg"
            >
              {rating || "NR"}
            </Badge>
            <span className="dark-shadow text-sm font-semibold text-white/60">
              {releaseYear}
            </span>
            <Dot size={20} className="-mx-2 text-white/60" />
            <ul className="hidden flex-row gap-1 md:flex">
              {cast.slice(0, 3).map((person: any, index: number) => (
                <li
                  key={index}
                  className="dark-shadow whitespace-nowrap text-sm font-semibold text-white/60"
                >
                  <Link
                    href={`/person/${person?.id}/${person?.name}`}
                    className="hover:text-white"
                  >
                    {index === 2 ? person?.name : `${person?.name}, `}
                  </Link>
                </li>
              ))}
            </ul>
            <span className="dark-shadow mb-[3px] hidden h-[1.2rem] overflow-hidden text-white/60 md:block">
              |
            </span>
            <button
              onClick={scrollToCast}
              className="dark-shadow group group flex items-center gap-1 text-sm font-semibold text-white/60 underline-offset-2 hover:text-white hover:underline"
            >
              See Full Cast{" "}
              <ChevronsRight
                size={20}
                className="dark-shadow underline-offset-2 transition-transform group-hover:animate-wiggle group-hover:text-white group-hover:underline"
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
              title: mediaType === "movie" ? mediaData?.title : mediaData?.name,
              poster_image: mediaData?.poster_path,
              link: `/${mediaType}/${mediaData?.id}/${formattedTitle}`,
            }}
            userId={userId.user?.id}
          />
        </section>
        <section className="container relative z-10 flex w-full flex-col gap-8 lg:flex-row lg:gap-6">
          <Image
            className="hidden rounded-lg border border-white text-card-foreground shadow-2xl transition-transform hover:rotate-3 hover:scale-105 lg:block"
            width={175}
            height={250}
            src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${mediaData?.poster_path}`}
            alt={`Poster image for ${mediaType === "tv" ? mediaData?.title : mediaData?.name}`}
            priority
            loading="eager"
          />
          <div className="flex flex-col gap-3 md:w-1/2">
            <h2 className="dark-shadow -mb-2 text-lg font-semibold tracking-widest text-white">
              Description
            </h2>
            <p className="dark-shadow dark-shadow text-white/60 md:w-2/3">
              {mediaData?.overview}
            </p>
            <div className="flex gap-2 lg:mt-4">
              {mediaData?.genres.map((name: any, index: number) => (
                <Link
                  key={index}
                  href={`/categories/${name?.id}/${name?.name}`}
                  className={`${badgeVariants({ variant: "outline" })} w-fit border-white px-3 py-1 text-sm font-medium text-white shadow-lg transition-all hover:bg-primary`}
                >
                  {name?.name}
                </Link>
              ))}
            </div>
          </div>
          {trailerVideo !== null && trailerVideo.length > 0 && (
            <Card className="flex flex-col gap-2">
              <CardTitle className="dark-shadow p-0 text-lg font-semibold tracking-widest text-white">
                Watch Trailer
              </CardTitle>
              <iframe
                src={`https://www.youtube.com/embed/${trailerVideo[0]?.key}`}
                loading="eager"
                title={trailerVideo[0]?.name}
                className="aspect-video w-full rounded-lg border border-white object-contain shadow-lg md:w-1/2 lg:w-[400px]"
              />
            </Card>
          )}
        </section>
      </section>
      {mediaType === "tv" && <EpisodeGrid id={id} mediaData={mediaData} />}
      <div
        className="flex flex-col items-center gap-20 overflow-hidden pt-16"
        ref={castSectionRef}
      >
        <div className="container pr-0">
          <div className="relative z-10 -mb-4 flex flex-row items-baseline gap-4 px-1 pr-8 text-white lg:pr-12">
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
        <div className="flex flex-col items-center gap-20 overflow-hidden pt-16">
          <div className="container pr-0">
            <div className="relative z-10 -mb-4 flex flex-row items-baseline gap-4 px-1 pr-8 text-white lg:pr-12">
              <h3 className="text-xl font-semibold">More Like This</h3>
            </div>
            <ProductCarousel
              mediaType={mediaType}
              data={mediaType === "tv" ? recommendedShows : recommendedMovies}
              width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default MediaPage;
