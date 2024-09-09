"use client";

import Footer from "@/Components/Footer";
import Loader from "@/Components/Loader";
import Nav from "@/Components/Nav";
import { Button } from "@/Components/ui/Button";
import { Card } from "@/Components/ui/card";
import {
  getPerson,
  getPersonCredit,
  getPersonExternalId,
  getPersonPoster,
} from "@/lib/utils";
import {
  Facebook,
  TwitterIcon,
  Instagram,
  Clapperboard,
  Link2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMemo } from "react";

function formatBirthday(birthday: string) {
  if (!birthday) return "";

  const date = new Date(birthday);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Calculate age
  const today = new Date();
  const age = today.getFullYear() - year;
  const hasHadBirthdayThisYear =
    today.getMonth() > date.getMonth() ||
    (today.getMonth() === date.getMonth() && today.getDate() >= day);

  const finalAge = hasHadBirthdayThisYear ? age : age - 1;

  return `${day} ${month} ${year} (age ${finalAge})`;
}

type Data = {
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  profile_path: string;
};

const Person = ({ id }: { id: number }) => {
  const [activeTab, setActiveTab] = useState(1);

  const [personData, setPersonData] = useState<any | null | Data>(null);
  const [personPoster, setPersonPoster] = useState<null | any>(null);
  const [personCredit, setPersonCredit] = useState<null | any>(null);
  const [personID, setPersonID] = useState<null | any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const birthday = useMemo(
    () => formatBirthday(personData?.birthday),
    [personData],
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const personData = await getPerson(id);
        const personPoster = await getPersonPoster(id);
        const personCredit = await getPersonCredit(id);
        const personID = await getPersonExternalId(id);

        if (personData) {
          setPersonData(personData);
          setPersonPoster(personPoster);
          setPersonCredit(personCredit.cast);
          setPersonID(personID);
        } else {
          setError("No data available");
        }
      } catch (error) {
        console.error("Error fetching Promo Data:", error);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  console.log(personData);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!personData) return <div>No data available</div>;

  return (
    <>
      <Nav />
      <div className="container flex flex-col gap-4 pt-28">
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
            className="float-left mr-3 lg:mr-8 lg:w-96 xl:mr-12"
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
              <span>{birthday}</span>
              <span>{personData?.place_of_birth}</span>
            </div>
          </section>
          <div className="mt-8 flex items-center gap-8 text-white">
            <Link
              href={`https://www.facebook.com/${personID?.facebook_id}`}
              className={`${personID?.facebook_id != null ? "" : "hidden"}`}
            >
              <Facebook />
            </Link>
            <Link
              href={`https://www.x.com/${personID?.twitter_id}`}
              className={`${personID?.twitter_id != null ? "" : "hidden"}`}
            >
              <TwitterIcon />
            </Link>
            <Link
              href={`https://www.instagram.com/${personID?.instagram_id}`}
              className={`${personID?.instagram_id != null ? "" : "hidden"}`}
            >
              <Instagram />
            </Link>
            <Link
              href={`https://www.imdb.com/title/${personID?.imdb_id}`}
              className={`${personID?.imdb_id != null ? "" : "hidden"}`}
            >
              <Clapperboard />
            </Link>
            <Link
              href={`${personData?.homepage}`}
              className={`${personID?.homepage != null ? "" : "hidden"}`}
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
            <span>{birthday}</span>
            <span>{personData?.place_of_birth}</span>
          </div>
        </section>
        <div className="mt-8 flex items-center gap-8 text-white lg:hidden">
          <Link href={`https://www.facebook.com/${personID?.facebook_id}`}>
            <Facebook />
          </Link>
          <Link href={`https://www.x.com/${personID?.twitter_id}`}>
            <TwitterIcon />
          </Link>
          <Link href={`https://www.instagram.com/${personID?.instagram_id}`}>
            <Instagram />
          </Link>
          <Link href={`https://www.imdb.com/title/${personID?.imdb_id}`}>
            <Clapperboard />
          </Link>
          <Link href={`${personData?.homepage}`}>
            <Link2 />
          </Link>
        </div>
      </div>
      <div className="container mt-8 flex w-full justify-between">
        <Button
          onClick={() => setActiveTab(1)}
          className={`${activeTab === 1 ? "bg-primary" : "bg-transparent text-white/30"} w-1/3 rounded-none`}
        >
          KNOWN FOR
        </Button>
        <Button
          onClick={() => setActiveTab(2)}
          className={`${activeTab === 2 ? "bg-primary" : "bg-transparent text-white/30"} w-1/3 rounded-none`}
        >
          CREDITS
        </Button>
        <Button
          onClick={() => setActiveTab(3)}
          className={`${activeTab === 3 ? "bg-primary" : "bg-transparent text-white/30"} w-1/3 rounded-none`}
        >
          PHOTOS
        </Button>
      </div>
      <section className="container mt-8 grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-4 lg:grid-cols-6 xl:grid-cols-8">
        {personCredit?.map(
          (movie: {
            id: number;
            poster_path: string;
            original_title: string;
          }) => {
            const formattedTitle = (movie?.original_title || "")
              .toLowerCase()
              .replace(/[^\w\s]/gi, "")
              .replace(/\s+/g, "-");

            return (
              <>
                {movie.poster_path !== null && (
                  <Link
                    key={movie.id}
                    href={`/movie/${movie.id}/${formattedTitle}`}
                    className="group overflow-hidden"
                  >
                    <Card className="relative transition-transform group-hover:scale-105">
                      <Image
                        src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movie.poster_path}`}
                        alt={`Poster image for ${movie.original_title}`}
                        loading="lazy"
                        width={200}
                        height={200}
                        className="h-auto"
                      />
                    </Card>
                  </Link>
                )}
              </>
            );
          },
        )}
      </section>
      <Footer />
    </>
  );
};

export default function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  return <Person id={id} />;
}
