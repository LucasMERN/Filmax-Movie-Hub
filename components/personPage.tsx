"use client";

import Footer from "@/components/footer";
import Nav from "@/components/nav";
import { Card } from "@/components/ui/card";
import { ExternalID, Person, PersonCredit } from "@/types/api";
import {
  Facebook,
  TwitterIcon,
  Instagram,
  Clapperboard,
  Link2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useMemo } from "react";

function formatBirthday(birthday: string) {
  if (!birthday) return "";

  const date = new Date(birthday);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const today = new Date();
  const age = today.getFullYear() - year;
  const hasHadBirthdayThisYear =
    today.getMonth() > date.getMonth() ||
    (today.getMonth() === date.getMonth() && today.getDate() >= day);

  const finalAge = hasHadBirthdayThisYear ? age : age - 1;

  return `${day} ${month} ${year} (age ${finalAge})`;
}

const PersonPage = ({
  personData,
  personCredit,
  personID,
}: {
  personData: Person;
  personCredit: PersonCredit[];
  personID: ExternalID;
}) => {
  const formattedBirthday = useMemo(
    () => formatBirthday(personData?.birthday),
    [personData],
  );

  if (!personData) return <div>No data available</div>;

  return (
    <>
      <div className="container flex flex-col gap-4 pt-36">
        <h1 className="text-xl font-semibold text-white lg:hidden">
          {personData.name}
        </h1>
        <div>
          <Image
            priority
            loading="eager"
            width={150}
            height={200}
            src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${personData.profile_path}`}
            alt={`Professional headshot of ${personData.name}`}
            className="float-left mr-3 lg:mb-4 lg:mr-8 lg:w-72"
            unoptimized
          />
          <h1 className="hidden text-3xl font-bold text-white lg:mb-4 lg:block">
            {personData.name}
          </h1>
          <p className="text-sm text-white lg:w-5/6 lg:text-base xl:w-2/3">
            {personData.biography}
          </p>
          <section className="mt-8 hidden gap-6 lg:flex">
            <div className="flex flex-col gap-2 font-medium text-white">
              <h2>Known For</h2>
              <h2>Born</h2>
              <h2>Place of Birth</h2>
            </div>
            <div className="flex flex-col gap-2 text-sm leading-6 text-white">
              <span>{personData?.known_for_department}</span>
              <span>{formattedBirthday}</span>
              <span>{personData?.place_of_birth}</span>
            </div>
          </section>
          <div className="mt-8 hidden items-center gap-8 text-white lg:flex">
            <Link
              href={`https://www.facebook.com/${personID?.facebook_id}`}
              className={`${personID?.facebook_id != null ? "text-white transition hover:text-primary" : "hidden"}`}
              target="_blank"
            >
              <Facebook />
            </Link>
            <Link
              href={`https://www.x.com/${personID?.twitter_id}`}
              className={`${personID?.twitter_id != null ? "text-white transition hover:text-primary" : "hidden"}`}
              target="_blank"
            >
              <TwitterIcon />
            </Link>
            <Link
              href={`https://www.instagram.com/${personID?.instagram_id}`}
              className={`${personID?.instagram_id != null ? "text-white transition hover:text-primary" : "hidden"}`}
              target="_blank"
            >
              <Instagram />
            </Link>
            <Link
              href={`https://www.imdb.com/title/${personID?.imdb_id}`}
              className={`${personID?.imdb_id != null ? "text-white transition hover:text-primary" : "hidden"}`}
              target="_blank"
            >
              <Clapperboard />
            </Link>
            <Link
              href={`${personData?.homepage}`}
              className={`${personData?.homepage != null ? "text-white transition hover:text-primary" : "hidden"}`}
              target="_blank"
            >
              <Link2 />
            </Link>
          </div>
        </div>
        <section className="mt-8 flex gap-6 lg:hidden">
          <div className="flex flex-col gap-2 font-medium text-white">
            <h2>Known For</h2>
            <h2>Born</h2>
            <h2>Place of Birth</h2>
          </div>
          <div className="flex flex-col gap-2 text-sm leading-6 text-white">
            <span>{personData?.known_for_department}</span>
            <span>{formattedBirthday}</span>
            <span>{personData?.place_of_birth}</span>
          </div>
        </section>
        <div className="mt-8 flex items-center gap-8 lg:hidden">
          <Link
            href={`https://www.facebook.com/${personID?.facebook_id}`}
            className={`${personID?.facebook_id != null ? "text-white transition hover:text-primary" : "hidden"}`}
            target="_blank"
          >
            <Facebook />
          </Link>
          <Link
            href={`https://www.x.com/${personID?.twitter_id}`}
            className={`${personID?.twitter_id != null ? "text-white transition hover:text-primary" : "hidden"}`}
            target="_blank"
          >
            <TwitterIcon />
          </Link>
          <Link
            href={`https://www.instagram.com/${personID?.instagram_id}`}
            className={`${personID?.instagram_id != null ? "text-white transition hover:text-primary" : "hidden"}`}
            target="_blank"
          >
            <Instagram />
          </Link>
          <Link
            href={`https://www.imdb.com/title/${personID?.imdb_id}`}
            className={`${personID?.imdb_id != null ? "text-white transition hover:text-primary" : "hidden"}`}
            target="_blank"
          >
            <Clapperboard />
          </Link>
          <Link
            href={`${personData?.homepage}`}
            className={`${personData?.homepage != null ? "text-white transition hover:text-primary" : "hidden"}`}
            target="_blank"
          >
            <Link2 />
          </Link>
        </div>
      </div>
      <div className="container mt-12 flex w-full justify-center border-t border-t-primary pt-12">
        <h2 className="text-3xl font-semibold uppercase tracking-widest text-white">
          Filmography
        </h2>
      </div>
      {personCredit.length > 0 ? (
        <>
          <section className="container mt-8 grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-4 lg:grid-cols-6 xl:grid-cols-8">
            {personCredit?.map(
              (
                movie: {
                  id: number;
                  adult: boolean;
                  poster_path: string;
                  title: string;
                  media_type: string;
                  name: string;
                },
                key: number,
              ) => {
                const formattedTitle = (movie?.title || movie?.name)
                  .toLowerCase()
                  .replace(/[^\w\s]/gi, "")
                  .replace(/\s+/g, "-");

                return (
                  <React.Fragment key={key}>
                    {movie.poster_path !== null && movie.adult !== true && (
                      <Link
                        key={movie.id}
                        href={`${movie.media_type === "movie" ? `/movie/${movie.id}/${formattedTitle}` : `/tv/${movie.id}/${formattedTitle}`}`}
                        className="group overflow-hidden"
                      >
                        <Card className="relative transition-transform group-hover:scale-105">
                          <Image
                            src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movie.poster_path}`}
                            alt={`Poster image for ${movie.title}`}
                            loading="lazy"
                            width={200}
                            height={200}
                            className="h-auto"
                            unoptimized
                          />
                        </Card>
                      </Link>
                    )}
                  </React.Fragment>
                );
              },
            )}
          </section>
        </>
      ) : (
        <div className="container mt-8 text-xl text-white">
          Sorry, there is no Data Available for {personData.name}...
        </div>
      )}
    </>
  );
};

export default PersonPage;
