"use client";

import { getPromo } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import Image from "next/image";
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

type PromoTypes = {
  id: string;
  color: string;
  mediaType: string;
};

const Promo = ({ id, color, mediaType }: PromoTypes) => {
  const [data, setData] = useState<null | Data>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPromo(
          `https://api.themoviedb.org/3/${mediaType}/${id}?language=en-US`,
        );

        if (data) {
          setData(data);
        } else {
          console.error("Data is not available:", data);
        }
      } catch (error) {
        console.error("Error fetching Promo Data:", error);
      }
    };
    fetchData();
  }, [id, mediaType]);

  console.log(data);

  return (
    <section
      className="text-garamond w-full py-24 text-white md:py-44 lg:block xl:py-96"
      style={{
        backgroundImage: `radial-gradient(ellipse at 0% 65%, #471dbaa8, transparent 35%),
        radial-gradient(ellipse at 90% 0%, #471dbaa8, transparent 35%),
        linear-gradient(to top, ${color} 5%, transparent 50%), url(https://image.tmdb.org/t/p/original/${data?.poster_path})`,
        backgroundPosition: "0% 0%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <section className="container relative text-black mix-blend-color-burn">
        <div className="mx-12 flex flex-col items-center gap-8 border-blue-400 sm:border sm:border-t-0">
          <div className="absolute -top-20 right-4 hidden flex-col content-end gap-8 bg-white pb-8 sm:flex">
            <div className="flex flex-col text-center">
              <h2 className="text-xl font-light">Genre</h2>
              <span className="text-xl font-bold">{data?.genres[1].name}</span>
            </div>
            <div className="flex flex-col text-center">
              <h2 className="text-xl font-light">Production</h2>
              <span className="text-xl font-bold">
                {data?.production_companies[0].name}
              </span>
            </div>
          </div>
          <div className="absolute -top-20 left-8 hidden flex-col content-start gap-8 bg-white pb-8 sm:flex">
            <div className="flex flex-col text-center">
              <h2 className="text-xl font-light">Dune:</h2>
              <span className="text-xl font-extrabold">Part II</span>
            </div>
            <div className="flex flex-col text-center">
              <h2 className="text-xl font-light">Audience Score</h2>
              <span className="text-xl font-extrabold">
                {data?.vote_average}/10
              </span>
            </div>
          </div>
          <div className="-mt-12 flex flex-col gap-2 text-center">
            <h1 className="w-min break-words text-6xl font-bold capitalize">
              {data?.tagline}
            </h1>
          </div>
          <div className="-mb-6 flex w-full justify-between">
            <div className="invisible flex w-1/3 flex-col pl-4 sm:visible">
              <h3 className="text-sm font-medium">Premier on</h3>
              <span className="text-xl font-bold">27 Feb</span>
            </div>
            <div className="bg-white px-2">
              <Link
                href="#"
                className="mt-20 inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md bg-black px-8 text-xl font-bold tracking-widest text-white"
              >
                ENTER
              </Link>
            </div>
            <div className="invisible flex w-1/3 flex-col pr-4 sm:visible">
              <h3 className="text-end text-sm font-medium">Available on</h3>
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
    </section>
  );
};

export default Promo;
