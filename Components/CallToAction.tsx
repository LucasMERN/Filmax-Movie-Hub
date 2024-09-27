"use client";

import { useState, useEffect } from "react";
import { getSingle } from "@/lib/api";
import Link from "next/link";

interface CallToActionTypes {
  id: number;
  color: string;
  mediaType: string;
}

interface CallToActionData {
  backdrop_path: string;
  name: string;
  genres: [];
  created_by: [];
  overview: string;
}

const CallToAction = ({ id, color, mediaType }: CallToActionTypes) => {
  const [callToActionResults, setCallToActionResults] =
    useState<CallToActionData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSingle(mediaType, id);

        if (data) {
          setCallToActionResults(data);
        } else {
          console.error("Data is not available:", data);
        }
      } catch (error) {
        console.error("Error fetching CTA:", error);
      }
    };
    fetchData();
  }, [id, mediaType]);

  const formattedTitle = (callToActionResults?.name || "")
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-");

  return (
    <>
      <section
        className="hidden w-full py-24 text-white lg:block"
        style={{
          backgroundImage: `linear-gradient(to right, ${color} 30%, transparent 60%), url(https://image.tmdb.org/t/p/original/${callToActionResults?.backdrop_path})`,
          backgroundPosition: "0% 10%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="flex w-1/2 flex-col gap-8">
            <h3 className="text-2xl font-bold tracking-wider">
              {callToActionResults?.name}
            </h3>
            <div className="flex flex-row flex-wrap items-center">
              <span className="text-lg font-medium">Category:</span>
              {callToActionResults?.genres.map((genres: any, index: number) => (
                <span
                  key={index}
                  className={`${callToActionResults.genres.length - 1 === index ? "" : "border-r-2"} px-2 leading-none`}
                >
                  {genres.name}
                </span>
              ))}
            </div>
            <div className="flex flex-row items-center">
              <span className="text-lg font-medium">Director:</span>
              {callToActionResults?.created_by.map(
                (director: any, index: number) => (
                  <span key={index} className="px-2">
                    {director.name}
                  </span>
                ),
              )}
            </div>
            <div className="w-1/2">{callToActionResults?.overview}</div>
            <Link
              href={`${mediaType}/${id}/${formattedTitle}`}
              className="hover:bg-secondary/80 inline-flex h-8 w-fit items-center justify-center whitespace-nowrap rounded-md bg-white px-4 text-base font-semibold text-secondary-foreground transition-colors"
            >
              Explore
            </Link>
          </div>
        </div>
      </section>
      <section
        className="w-full py-24 text-white lg:hidden"
        style={{
          backgroundImage: `linear-gradient(to top, ${color} 45%, transparent 80%), url(https://image.tmdb.org/t/p/original/${callToActionResults?.backdrop_path})`,
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="flex flex-col gap-8">
            <h3 className="dark-shadow text-2xl font-bold tracking-wider">
              {callToActionResults?.name}
            </h3>
            <div className="flex flex-row items-center">
              <span className="dark-shadow text-lg font-medium">Category:</span>
              {callToActionResults?.genres.map((genres: any, index: number) => (
                <span
                  key={index}
                  className={`${callToActionResults.genres.length - 1 === index ? "" : "border-r-2"} dark-shadow px-2 leading-none`}
                >
                  {genres.name}
                </span>
              ))}
            </div>
            <div className="flex flex-row items-center">
              <span className="dark-shadow text-lg font-medium">Director:</span>
              {callToActionResults?.created_by.map(
                (director: any, index: number) => (
                  <span key={index} className="dark-shadow px-2">
                    {director.name}
                  </span>
                ),
              )}
            </div>
            <div className="dark-shadow">{callToActionResults?.overview}</div>
            <Link
              href={`${mediaType}/${id}/${formattedTitle}`}
              className="hover:bg-secondary/80 inline-flex h-8 w-fit items-center justify-center whitespace-nowrap rounded-md bg-white px-4 text-base font-semibold text-secondary-foreground transition-colors"
            >
              Explore
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;
