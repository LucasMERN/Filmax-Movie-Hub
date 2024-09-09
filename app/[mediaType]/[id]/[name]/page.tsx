"use client";

import BackgroundImage from "@/Components/ui/BackgroundImage";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/Button";
import {
  getContentRating,
  getCredits,
  getExternalId,
  getRecommended,
  getRelease,
  getSingle,
  getYouTubeVideo,
} from "@/lib/utils";
import {
  ChevronsRight,
  Clapperboard,
  Dot,
  Facebook,
  Instagram,
  Link2,
  Plus,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RadialChart } from "@/Components/RadialChart";
import { Card, CardTitle } from "@/Components/ui/card";
import React from "react";
import Nav from "@/Components/Nav";
import Footer from "@/Components/Footer";
import Loader from "@/Components/Loader";
import ProductCarousel from "@/Components/ProductCarousel";

type Data = {
  backdrop_path: string;
  belongs_to_collection: {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
  };
  genres: {
    name: string;
  }[];
  homepage: string;
  id: number;
  original_title: string;
  title: string;
  overview: string;
  poster_path: string;
  production_companies: {
    name: string;
  }[];
  release_date: string;
  runtime: number;
  tagline: string;
  vote_average: number;
  vote_count: number;
  last_air_date: string;
  first_air_date: string;
  original_name: string;
};

const MovieOrTVShow = ({
  id,
  mediaType,
}: {
  id: number;
  mediaType: "movie" | "tv";
}) => {
  const [mediaData, setMediaData] = useState<null | Data>(null);
  const [externalData, setExternalData] = useState<null | any>(null);
  const [videoData, setVideoData] = useState<null | any>(null);
  const [creditData, setCreditData] = useState<null | any>(null);
  const [recommendedData, setRecommendedData] = useState<null | any>(null);
  const [releaseData, setReleaseData] = useState<null | any>(null);
  const [contentRatingData, setContentRatingData] = useState<null | any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const mediaData = await getSingle(mediaType, id);
        const creditData = await getCredits(id, mediaType);
        const videoData = await getYouTubeVideo(id, mediaType);
        const externalData = await getExternalId(id, mediaType);
        const recommendedData = await getRecommended(id, mediaType);
        if (mediaType !== "tv") {
          const releaseData = await getRelease(mediaType, id);
          if (releaseData) {
            setReleaseData(
              releaseData?.results.filter(
                (data: { iso_3166_1: string }) => data.iso_3166_1 === "US",
              ),
            );
          }
        } else {
          const contentRatingData = await getContentRating(mediaType, id);
          if (contentRatingData) {
            setContentRatingData(
              contentRatingData?.results.filter(
                (data: { iso_3166_1: string }) => data.iso_3166_1 === "US",
              ),
            );
          }
        }
        if (mediaData) {
          setMediaData(mediaData);
          setExternalData(externalData);
          setVideoData(
            videoData?.results.filter((data: { name: string }) =>
              data.name.split(" ").includes("Trailer"),
            ),
          );
          setCreditData(creditData);
          setRecommendedData(recommendedData);
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
  }, [id, mediaType]);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!mediaData) return <div>No data available</div>;

  console.log(recommendedData);

  return (
    <main className="relative min-h-screen">
      <Nav />
      <section className="relative border-b-2 border-primary pb-14 pt-16">
        <div
          className="absolute left-0 top-0 z-[9] h-full w-full"
          style={{
            background: "linear-gradient(to top, black 0%, transparent 100%)",
          }}
        ></div>
        <BackgroundImage
          src={`https://image.tmdb.org/t/p/original/${mediaData?.backdrop_path}`}
          alt={mediaData.overview}
          lazy="eager"
          priority
        />
        <section className="container relative z-10 mb-14 flex flex-col gap-6 border-b border-white pb-14 pt-24">
          <span className="dark-shadow -mb-6 text-sm font-semibold uppercase tracking-widest text-white/60">
            {mediaType !== "movie" ? "tv series" : mediaType}
          </span>
          <h1 className="dark-shadow text-2xl font-bold tracking-wider text-white md:text-4xl">
            {mediaData.original_title || mediaData?.original_name}
          </h1>
          <div className="flex items-center gap-4 text-white">
            <Link
              className={`${externalData?.facebook_id != null ? "" : "hidden"}`}
              href={`https://www.facebook.com/${externalData?.facebook_id}`}
            >
              <Facebook />
            </Link>
            <Link
              href={`https://www.x.com/${externalData?.twitter_id}`}
              className={`${externalData?.twitter_id != null ? "" : "hidden"}`}
            >
              <TwitterIcon />
            </Link>
            <Link
              className={`${externalData?.instagram_id != null ? "" : "hidden"}`}
              href={`https://www.instagram.com/${externalData?.instagram_id}`}
            >
              <Instagram />
            </Link>
            <Link
              href={`https://www.imdb.com/title/${externalData?.imdb_id}`}
              className={`${externalData?.imdb_id != null ? "" : "hidden"}`}
            >
              <Clapperboard />
            </Link>
            <Link
              href={`${mediaData?.homepage}`}
              className={`${mediaData?.homepage != null ? "" : "hidden"}`}
            >
              <Link2 />
            </Link>
          </div>
          <div className="relative flex flex-row items-center gap-2">
            <Badge
              variant="outline"
              className="mr-2 w-fit rounded-md border-white text-sm font-medium text-white shadow-lg"
            >
              {mediaType !== "movie"
                ? contentRatingData[0].rating || "PG"
                : releaseData[0].release_dates[0].certification || "PG"}
            </Badge>
            <span className="dark-shadow text-sm font-semibold text-white/60">
              {mediaType !== "movie" ? (
                <span>
                  {mediaData?.first_air_date.split("-")[0]} -{" "}
                  {mediaData?.last_air_date.split("-")[0]}
                </span>
              ) : (
                releaseData[0].release_dates[0].release_date.split("-")[0]
              )}
            </span>
            <Dot size={20} className="-mx-2 text-white/60" />
            <ul className="hidden flex-row gap-1 md:flex">
              {creditData.cast.slice(0, 3).map((person: any, index: number) => (
                <li
                  key={index}
                  className="dark-shadow whitespace-nowrap text-sm font-semibold text-white/60"
                >
                  <Link
                    href={`/person/${person.id}/${person.name}`}
                    className="hover:text-white"
                  >
                    {index === 2 ? person.name : `${person.name}, `}
                  </Link>
                </li>
              ))}
            </ul>
            <span className="dark-shadow mb-[3px] hidden h-[1.2rem] overflow-hidden text-white/60 md:block">
              |
            </span>
            <Link
              href="#cast"
              className="dark-shadow group group flex items-center gap-1 text-sm font-semibold text-white/60 underline-offset-2 hover:text-white hover:underline"
            >
              See Full Cast{" "}
              <ChevronsRight
                size={20}
                className="dark-shadow group-hover:animate-wiggle underline-offset-2 transition-transform group-hover:text-white group-hover:underline"
              />
            </Link>
            <RadialChart
              voteCount={mediaData.vote_count}
              voteAverage={mediaData.vote_average}
            />
          </div>
          <Button
            size="lg"
            variant="outline"
            className="flex w-fit items-center gap-2 px-3 shadow-lg"
          >
            Add to watchlist <Plus size={18} strokeWidth={3} />
          </Button>
        </section>
        <section className="container relative z-10 flex w-full flex-col gap-8 lg:flex-row lg:gap-6">
          <Image
            className="hidden rounded-lg border border-white text-card-foreground shadow-2xl transition-transform hover:rotate-3 hover:scale-105 lg:block"
            width={175}
            height={250}
            src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${mediaData.poster_path}`}
            alt={mediaData.overview}
            priority
          />
          <div className="flex flex-col gap-3 md:w-1/2">
            <h2 className="dark-shadow -mb-2 text-lg font-semibold tracking-widest text-white">
              Description
            </h2>
            <p className="dark-shadow dark-shadow text-white/60 md:w-2/3">
              {mediaData.overview}
            </p>
            <div className="flex gap-2 lg:mt-4">
              {mediaData.genres.map((name, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="w-fit border-white text-sm font-medium text-white shadow-lg"
                >
                  {name.name}
                </Badge>
              ))}
            </div>
          </div>
          {videoData.length > 0 && (
            <Card className="flex flex-col gap-2">
              <CardTitle className="dark-shadow p-0 text-lg font-semibold tracking-widest text-white">
                Watch Trailer
              </CardTitle>
              <React.Suspense fallback={<p>Loading video...</p>}>
                <iframe
                  src={`https://www.youtube.com/embed/${videoData[0].key}`}
                  loading="eager"
                  title={videoData[0].name}
                  className="aspect-video w-full rounded-lg border border-white object-contain shadow-lg md:w-1/2 lg:w-[400px]"
                />
              </React.Suspense>
            </Card>
          )}
        </section>
      </section>
      {creditData?.cast.length > 0 && (
        <div className="flex flex-col items-center gap-20 overflow-hidden pt-16">
          <div className="container pr-0">
            <div className="relative z-10 -mb-4 flex flex-row items-baseline gap-4 px-1 pr-8 text-white lg:pr-12">
              <h3 className="text-xl font-semibold">Cast</h3>
            </div>
            <ProductCarousel
              mediaType="person"
              loop={false}
              data={creditData?.cast}
              width="md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
            />
          </div>
        </div>
      )}
      {recommendedData?.results.length > 0 && (
        <div className="flex flex-col items-center gap-20 overflow-hidden pt-16">
          <div className="container pr-0">
            <div className="relative z-10 -mb-4 flex flex-row items-baseline gap-4 px-1 pr-8 text-white lg:pr-12">
              <h3 className="text-xl font-semibold">More Like This</h3>
            </div>
            <ProductCarousel
              mediaType={mediaType}
              data={recommendedData?.results}
              width="md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
            />
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
};

export default function Page({
  params,
}: {
  params: { mediaType: "movie" | "tv"; id: number };
}) {
  const { mediaType, id } = params;
  return <MovieOrTVShow id={id} mediaType={mediaType} />;
}
