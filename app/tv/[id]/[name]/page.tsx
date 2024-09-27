"use client";

import BackgroundImage from "@/components/ui/backgroundImage";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Brokenimage from "@/public/brokenImage.jpg";
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
import { useEffect, useState, useRef, useCallback } from "react";
import { RadialChart } from "@/components/radialChart";
import { Card, CardTitle } from "@/components/ui/card";
import React from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Loader from "@/components/loader";
import ProductCarousel from "@/components/productCarousel";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TV } from "@/types/api";
import { useEpisodeData } from "@/hooks/useEpisodeData";
import { useSingleTVData } from "@/hooks/useSingleTVData";
import { useContentRatingData } from "@/hooks/useContentRatingData";
import { useYoutubeData } from "@/hooks/useYoutubeData";
import { useExternalData } from "@/hooks/useExternalData";
import { useCreditData } from "@/hooks/useCreditData";
import { useRecommendedData } from "@/hooks/useRecommendedData";

const TVShowPage = ({ id, mediaType }: { id: number; mediaType: "tv" }) => {
  const {
    mediaData,
    isLoading: mediaLoading,
    error: mediaError,
  } = useSingleTVData(mediaType, id);

  const [activeSeason, setActiveSeason] = useState<string | undefined>();

  const {
    episodeData,
    isLoading: episodesLoading,
    error: episodesError,
  } = useEpisodeData((mediaData as TV) || undefined, activeSeason);

  const {
    creditData,
    isLoading: creditLoading,
    error: creditError,
  } = useCreditData(mediaType, id);

  const {
    contentRatingData,
    isLoading: contentRatingLoading,
    error: contentRatingError,
  } = useContentRatingData(mediaType, id);

  const {
    youtubeData,
    isLoading: youtubeDataLoading,
    error: youtubeDataError,
  } = useYoutubeData(mediaType, id);

  const {
    externalData,
    isLoading: externalDataLoading,
    error: externalDataError,
  } = useExternalData(mediaType, id);

  const {
    recommendedData,
    isLoading: recommendedLoading,
    error: recommendedError,
  } = useRecommendedData(mediaType, id);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mediaData?.seasons?.length) {
      setActiveSeason(
        String(mediaData.seasons[mediaData.seasons.length - 1]?.name),
      );
    }
  }, [mediaData]);

  useEffect(() => {
    if (
      !mediaLoading &&
      !episodesLoading &&
      !contentRatingLoading &&
      !youtubeDataLoading &&
      !externalDataLoading &&
      !creditLoading &&
      !recommendedLoading
    ) {
      setIsLoading(false);
    }
  }, [
    mediaLoading,
    episodesLoading,
    contentRatingLoading,
    youtubeDataLoading,
    externalDataLoading,
    creditLoading,
    recommendedLoading,
  ]);

  useEffect(() => {
    if (
      mediaError ||
      episodesError ||
      contentRatingError ||
      youtubeDataError ||
      externalDataError ||
      creditError ||
      recommendedError
    ) {
      setError(
        mediaError ??
          episodesError ??
          contentRatingError ??
          youtubeDataError ??
          externalDataError ??
          creditError ??
          recommendedError,
      );
    }
  }, [
    mediaError,
    episodesError,
    contentRatingError,
    youtubeDataError,
    externalDataError,
    creditError,
    recommendedError,
  ]);

  const castSection = useRef<HTMLDivElement | null>(null);

  const scrollToCast = useCallback(() => {
    if (castSection.current) {
      castSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!mediaData) return <div>No data available</div>;

  return (
    <main className="relative min-h-screen">
      <Nav />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <section className="relative border-b-2 border-primary pb-14 pt-16">
            <div
              className="absolute left-0 top-0 z-[9] h-full w-full"
              style={{
                background:
                  "linear-gradient(to top, black 0%, transparent 100%)",
              }}
            ></div>
            <BackgroundImage
              src={`https://image.tmdb.org/t/p/original/${mediaData.backdrop_path}`}
              alt={`Backdrop image for ${mediaData?.name}`}
              lazy="eager"
              priority
            />
            <section className="container relative z-10 mb-14 flex flex-col gap-6 border-b border-white pb-14 pt-24">
              <span className="dark-shadow -mb-6 text-sm font-semibold uppercase tracking-widest text-white/60">
                tv series
              </span>
              <h1 className="dark-shadow text-2xl font-bold tracking-wider text-white md:text-4xl">
                {mediaData?.name}
              </h1>
              <div className="flex items-center gap-4 text-white">
                <Link
                  className={`${externalData !== undefined && externalData?.facebook_id !== null ? "" : "hidden"}`}
                  href={`https://www.facebook.com/${externalData !== undefined && externalData?.facebook_id}`}
                >
                  <Facebook />
                </Link>
                <Link
                  href={`https://www.x.com/${externalData !== undefined && externalData?.twitter_id}`}
                  className={`${externalData !== undefined && externalData?.twitter_id != null ? "" : "hidden"}`}
                >
                  <TwitterIcon />
                </Link>
                <Link
                  className={`${externalData !== undefined && externalData?.instagram_id != null ? "" : "hidden"}`}
                  href={`https://www.instagram.com/${externalData !== undefined && externalData?.instagram_id}`}
                >
                  <Instagram />
                </Link>
                <Link
                  href={`https://www.imdb.com/title/${externalData !== undefined && externalData?.imdb_id}`}
                  className={`${externalData !== undefined && externalData?.imdb_id != null ? "" : "hidden"}`}
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
                  {(contentRatingData !== null &&
                    contentRatingData[0]?.rating) ||
                    "PG"}
                </Badge>
                <span className="dark-shadow text-sm font-semibold text-white/60">
                  {
                    <span>
                      {mediaData?.first_air_date.split("-")[0]} -{" "}
                      {mediaData?.last_air_date.split("-")[0]}
                    </span>
                  }
                </span>
                <Dot size={20} className="-mx-2 text-white/60" />
                <ul className="hidden flex-row gap-1 md:flex">
                  {creditData !== undefined &&
                    creditData.slice(0, 3).map((person: any, index: number) => (
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
                src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${mediaData?.poster_path}`}
                alt={`Poster image for ${mediaData?.name}`}
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
                  {mediaData?.genres.map((name, index) => (
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
              {youtubeData !== null && youtubeData?.length > 0 && (
                <Card className="flex flex-col gap-2">
                  <CardTitle className="dark-shadow p-0 text-lg font-semibold tracking-widest text-white">
                    Watch Trailer
                  </CardTitle>
                  <React.Suspense fallback={<p>Loading video...</p>}>
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeData[0]?.key}`}
                      loading="eager"
                      title={youtubeData[0]?.name}
                      className="aspect-video w-full rounded-lg border border-white object-contain shadow-lg md:w-1/2 lg:w-[400px]"
                    />
                  </React.Suspense>
                </Card>
              )}
            </section>
          </section>
          {mediaType === "tv" && mediaData?.seasons && (
            <section className="container flex flex-col gap-4 pt-8">
              <h3 className="text-2xl font-semibold tracking-widest text-white">
                Episodes
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Select
                    defaultValue={activeSeason}
                    value={activeSeason}
                    onValueChange={(value) => setActiveSeason(value)}
                  >
                    <SelectTrigger className="w-[120px] text-white">
                      <SelectValue>
                        {activeSeason || `Select Season`}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {mediaData?.seasons.map((season, index) => (
                          <SelectItem key={index} value={season?.name}>
                            {season?.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <span className="text-white/60">
                    {mediaData?.seasons.find(
                      (season) => season?.name === activeSeason,
                    )?.episode_count || "0"}{" "}
                    Episodes
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {episodeData &&
                  episodeData?.length > 0 &&
                  episodeData?.map((episode) => (
                    <div
                      key={episode?.id}
                      className="group flex flex-col gap-2 p-4 transition-colors hover:bg-primary"
                    >
                      {episode?.still_path !== null ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w533_and_h300_bestv2/${episode?.still_path}`}
                          alt={`Thumbnail image for ${episode?.name}`}
                          width={300}
                          height={200}
                          className="aspect-video w-full"
                          loading="lazy"
                        />
                      ) : (
                        <Image
                          src={Brokenimage}
                          alt={`This Image is not available`}
                          width={300}
                          height={200}
                          className="aspect-video w-full"
                          loading="lazy"
                        />
                      )}
                      <div className="flex gap-2">
                        <span className="dark-shadow font-bold text-primary transition-colors group-hover:text-white">
                          EP0{episode?.episode_number}
                        </span>
                        <h4 className="text-white">
                          {episode?.name.split("").length > 29
                            ? episode?.name.split("").slice(0, 30).join("") +
                              "..."
                            : episode?.name}
                        </h4>
                      </div>
                      <p className="pt-4 text-sm text-white/60">
                        {episode?.overview}
                      </p>
                      <span className="text-sm text-white/20 transition-colors group-hover:text-white/40">
                        {new Date(episode?.air_date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  ))}
              </div>
            </section>
          )}
          {creditData !== undefined && creditData?.length > 0 && (
            <div
              className="flex flex-col items-center gap-20 overflow-hidden pt-16"
              ref={castSection}
            >
              <div className="container pr-0">
                <div className="relative z-10 -mb-4 flex flex-row items-baseline gap-4 px-1 pr-8 text-white lg:pr-12">
                  <h3 className="text-xl font-semibold">Cast</h3>
                </div>
                <ProductCarousel
                  mediaType="person"
                  loop={false}
                  data={creditData}
                  width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
                />
              </div>
            </div>
          )}
          {recommendedData !== undefined && recommendedData?.length > 0 && (
            <div className="flex flex-col items-center gap-20 overflow-hidden pt-16">
              <div className="container pr-0">
                <div className="relative z-10 -mb-4 flex flex-row items-baseline gap-4 px-1 pr-8 text-white lg:pr-12">
                  <h3 className="text-xl font-semibold">More Like This</h3>
                </div>
                <ProductCarousel
                  mediaType={mediaType}
                  data={recommendedData}
                  width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
                />
              </div>
            </div>
          )}
        </>
      )}
      <Footer />
    </main>
  );
};

export default function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  return <TVShowPage id={id} mediaType="tv" />;
}