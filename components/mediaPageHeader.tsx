import {
  getContentRating,
  getCredits,
  getExternalId,
  getRelease,
  getYouTubeVideo,
} from "@/lib/api";
import React from "react";
import BackgroundImage from "@/components/ui/backgroundImage";
import Link from "next/link";
import {
  Clapperboard,
  Dot,
  Facebook,
  Instagram,
  Link2,
  Plus,
  TwitterIcon,
} from "lucide-react";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { RadialChart } from "@/components/radialChart";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardTitle } from "@/components/ui/card";
import { Movie, TV } from "@/types/api";

async function MediaPageHeader({
  mediaType,
  id,
  mediaData,
  children,
}: {
  mediaType: string;
  id: number;
  mediaData: TV & Movie;
  children: React.ReactNode;
}) {
  try {
    const externalData = await getExternalId(id, mediaType);
    const ratingData =
      mediaType === "tv"
        ? await getContentRating(mediaType, id)
        : await getRelease(mediaType, id);
    const creditData = await getCredits(id, mediaType);
    const youtubeData = await getYouTubeVideo(id, mediaType);

    const rating =
      mediaType === "tv"
        ? ratingData?.results?.[0]?.rating
        : ratingData?.results?.[0]?.release_dates?.[0]?.certification;

    const releaseYear =
      mediaType === "tv"
        ? `${mediaData.first_air_date?.split("-")[0] || "N/A"} - ${mediaData.last_air_date?.split("-")[0] || "Present"}`
        : ratingData?.results?.[0]?.release_dates?.[0]?.release_date?.split(
            "-",
          )[0] || "N/A";

    const trailerVideo = youtubeData?.results.filter((data: { name: string }) =>
      data?.name.split(" ").includes("Trailer"),
    );

    if (
      !mediaData ||
      !externalData ||
      !ratingData ||
      !creditData ||
      !youtubeData
    ) {
      return <div>No data available</div>;
    }

    return (
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
            {mediaType === "tv" ? mediaData?.title : mediaData?.name}
          </h1>
          <div className="flex items-center gap-4 text-white">
            <Link
              className={`${externalData?.facebook_id ? "" : "hidden"}`}
              href={`https://www.facebook.com/${externalData?.facebook_id}`}
            >
              <Facebook />
            </Link>
            <Link
              href={`https://www.x.com/${externalData?.twitter_id}`}
              className={`${externalData?.twitter_id ? "" : "hidden"}`}
            >
              <TwitterIcon />
            </Link>
            <Link
              className={`${externalData?.instagram_id ? "" : "hidden"}`}
              href={`https://www.instagram.com/${externalData?.instagram_id}`}
            >
              <Instagram />
            </Link>
            <Link
              href={`https://www.imdb.com/title/${externalData?.imdb_id}`}
              className={`${externalData?.imdb_id ? "" : "hidden"}`}
            >
              <Clapperboard />
            </Link>
            <Link
              href={`${mediaData?.homepage}`}
              className={`${mediaData?.homepage ? "" : "hidden"}`}
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
              {creditData?.cast
                .slice(0, 3)
                .map((person: any, index: number) => (
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
            <>{children}</>
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
    );
  } catch (error) {
    console.error("Error in Test component:", error);
    return <div>Error</div>;
  }
}

export default MediaPageHeader;
