"use client";

import { useState, useEffect } from "react";
import { getCallToAction } from "@/lib/utils";
import { Button } from "./Button";

interface CallToActionTypes {
  id: string;
  color: string;
  media: string;
}

interface CallToActionData {
  backdrop_path: string;
  name: string;
  genres: [];
  created_by: [];
  overview: string;
}

const CallToAction = ({ id, color, media }: CallToActionTypes) => {
  const [callToActionResults, setCallToActionResults] =
    useState<CallToActionData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCallToAction(
          `https://api.themoviedb.org/3/${media}/${id}?language=en-US`,
        );

        if (data) {
          setCallToActionResults(data);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching top10:", error);
      }
    };
    fetchData();
  }, [id, media]);

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
            <div className="flex flex-row items-center">
              <span className="text-lg font-medium">Category:</span>
              {callToActionResults?.genres.map((genres: any, index: number) => (
                <span key={index} className="border-r-2 px-2 leading-none">
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
            <div className="flex flex-row gap-6">
              <Button variant={"secondary"} size={"lg"}>
                Play Online
              </Button>
              <Button variant={"link"} size={"lg"}>
                More Details
              </Button>
            </div>
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
        <div className="dark-shadow container">
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-bold tracking-wider">
              {callToActionResults?.name}
            </h3>
            <div className="flex flex-row items-center">
              <span className="text-lg font-medium">Category:</span>
              {callToActionResults?.genres.map((genres: any, index: number) => (
                <span key={index} className="border-r-2 px-2 leading-none">
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
            <div>{callToActionResults?.overview}</div>
            <div className="flex flex-row gap-6">
              <Button variant={"secondary"} size={"lg"}>
                Play Online
              </Button>
              <Button variant={"link"} size={"lg"}>
                More Details
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;
