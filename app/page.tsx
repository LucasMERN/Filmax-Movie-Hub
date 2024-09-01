"use client";

import BackgroundImage from "@/Components/ui/BackgroundImage";
import { getHomepage } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/Components/ui/Button";
import netflix from "../public/netflix.png";
import max from "../public/max.png";
import amazon from "../public/amazon.png";
import Link from "next/link";

type Data = {
  poster_path: string;
  tagline: string;
  genres: {
    name: string;
  }[];
  production_companies: {
    name: string;
  }[];
  overview: string;
  vote_average: string;
};

export default function Home() {
  const [data, setData] = useState<null | Data>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHomepage(
          `https://api.themoviedb.org/3/movie/693134?language=en-US`,
        );

        if (data) {
          setData(data);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching top10:", error);
      }
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <main
      className="text-garamond flex h-full min-h-screen w-full flex-wrap content-end px-12 lg:px-24"
      style={{
        backgroundImage: `linear-gradient(to top, #9e6105 0%, transparent 40%), url(https://image.tmdb.org/t/p/original/${data?.poster_path})`,
        backgroundPosition: "0% 20%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <section className="relative z-10 mb-32 h-full w-full border border-t-0 border-blue-400 pb-12 mix-blend-color-burn">
        <div className="flex flex-col content-center items-center gap-8">
          <div className="absolute -right-10 -top-72 hidden flex-col content-end gap-16 md:flex">
            <div className="flex flex-col text-center ">
              <h2 className="text-xl font-light">Genre</h2>
              <span className="text-xl font-bold">{data?.genres[1].name}</span>
            </div>
            <div className="flex flex-col text-center ">
              <h2 className="text-xl font-light">Production</h2>
              <span className="w-min break-words text-xl font-bold">
                {data?.production_companies[0].name}
              </span>
            </div>
          </div>
          <div className="absolute -left-10 -top-72 hidden flex-col content-start gap-16 md:flex">
            <div className="flex flex-col text-center">
              <h2 className="text-xl font-light">Dune:</h2>
              <span className="text-xl font-bold">Part II</span>
            </div>
            <div className="flex flex-col text-center ">
              <h2 className="text-xl font-light">Audience Score</h2>
              <span className="text-xl font-bold">{data?.vote_average}/10</span>
            </div>
          </div>
          <div className="-mt-20 flex flex-col gap-2 text-center ">
            <h1 className="text-6xl font-bold capitalize ">
              Long{""}
              <br />
              Live The{""}
              <br />
              Fighters
            </h1>
          </div>
          <div className="-mb-8 flex w-full justify-between px-8">
            <div className="invisible flex w-1/3 flex-col md:visible">
              <h3 className="text-sm font-medium">Premier on</h3>
              <span className="text-xl font-bold">27 Feb</span>
            </div>
            <div className="-mb-32 bg-white px-8">
              <Link
                href="/dashboard"
                className="mt-20 inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md bg-primary px-8 text-xl font-bold text-white"
              >
                ENTER
              </Link>
            </div>
            <div className="invisible flex w-1/3 flex-col md:visible">
              <h3 className="text-center text-sm font-medium lg:ml-44">
                Available on
              </h3>
              <div className="-ml-3 -mt-3 flex items-center justify-end gap-2">
                <Image
                  src={max}
                  height={50}
                  width={105}
                  alt="HBO Max Logo"
                  className="aspect-video h-fit"
                />
                <Image
                  src={netflix}
                  height={50}
                  width={60}
                  alt="Netflix Logo"
                  className="-ml-2 aspect-video h-fit"
                />
                <Image
                  src={amazon}
                  height={80}
                  width={120}
                  alt="Amazon Logo"
                  className="-mx-6 mt-2 aspect-video h-fit"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
