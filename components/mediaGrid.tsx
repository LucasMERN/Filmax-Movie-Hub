"use client";

import Loader from "@/components/loader";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { getMediaByGenre, getPopular, getTrending } from "@/lib/api";

type MediaGridProps = {
  title: string;
  fetchType: "genre" | "popular" | "trending";
  genreID?: string;
  subtitle: string;
  mediaType?: "movie" | 'tv'
};

type Data = {
  id: number;
  poster_path: string;
  name: string;
  title: string;
};

const MediaGrid = ({ title, fetchType, genreID, subtitle, mediaType = "movie" }: MediaGridProps) => {
  const [mediaData, setMediaData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let media;
        if (fetchType === "genre" && genreID) {
          media = await getMediaByGenre(mediaType, genreID, currentPage);
        } else if (fetchType === "popular") {
          media = await getPopular(mediaType, currentPage);
        } else if (fetchType === "trending") {
          media = await getTrending(mediaType, currentPage);
        }
        
        if (Array.isArray(media?.results)) {
          setMediaData(media.results);
        } else {
          setError("No data available");
        }
      } catch (error) {
        console.error("Error fetching Media Data:", error);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage, fetchType, genreID]);

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <GridHeader title={title} subtitle={subtitle} />
      {isLoading ? <Loader /> : <GridItems data={mediaData} mediaType={mediaType} />}
      <Pagination className="flex w-full justify-center pt-12">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={`${currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer opacity-100"} transition-all`}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            />
          </PaginationItem>
          {Array(10)
            .fill(1)
            .map((_, index) => {
              const pageIndex = index + 1;
              const isVisible = Math.abs(currentPage - pageIndex) <= 1;

              return (
                <PaginationItem
                  key={index}
                  className={`${!isVisible ? "hidden" : ""} md:block`}
                >
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`${currentPage === index + 1 ? "pointer-events-none opacity-50" : "cursor-pointer opacity-100"} transition-all`}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          <PaginationItem>
            <PaginationNext
              className={`${currentPage === 10 ? "pointer-events-none opacity-50" : "cursor-pointer opacity-100"} transition-all`}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

const GridItems = ({ data, mediaType }: { data: Data[], mediaType: "movie" | "tv" }) => {
  return (
    <section className="container grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
      {data?.map((item, index) => {
        const formattedTitle = (item?.name || item?.title || "")
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-");

        return (
          <React.Fragment key={index}>
            {item.poster_path !== null && (
              <Link
                href={`/${mediaType}/${item.id}/${formattedTitle}`}
                className="group w-full overflow-hidden"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${item.poster_path}`}
                  width={342}
                  height={513}
                  className="h-full object-cover transition-transform group-hover:scale-105"
                  alt={`Poster image for ${item.title}`}
                  loading="lazy"
                />
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </section>
  );
};

const GridHeader = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className="container flex w-full flex-col gap-2 pb-12 pt-24 md:pt-48">
      <h1 className="text-4xl font-bold capitalize tracking-wider text-white">
        {title.split("%20").join(" ")}
      </h1>
      <span className="text-sm font-medium uppercase tracking-widest text-white/60">
        {subtitle}
      </span>
    </div>
  );
};

export default MediaGrid;
