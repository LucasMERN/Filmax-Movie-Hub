"use client";

import { getMediaByGenre } from "@/lib/api";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Loader from "@/components/loader";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type CategoryPageProps = {
  title: string;
  genreID: string;
};

type Data = {
  id: number;
  poster_path: string;
  name: string;
  title: string;
};

const CategoryPage = ({ title, genreID }: CategoryPageProps) => {
  const [genreMovieData, setGenreMovieData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const genreMovies = await getMediaByGenre(
          "movie",
          genreID,
          currentPage,
        );
        if (Array.isArray(genreMovies?.results)) {
          setGenreMovieData(genreMovies.results);
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
  }, [currentPage, genreID]);

  if (error) return <div>Error: {error}</div>;

  return (
    <main className="min-h-screen overflow-hidden">
      <div className="container flex w-full flex-col gap-2 pb-12 pt-24 md:pt-48">
        <h1 className="text-4xl font-bold capitalize tracking-wider text-white">
          {title.split("%20").join(" ")}
        </h1>
        <span className="text-sm font-medium tracking-widest text-white/60">
          MOVIES
        </span>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="container grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          {genreMovieData?.map((item, index) => {
            const formattedTitle = (item?.name || item?.title || "")
              .toLowerCase()
              .replace(/[^\w\s]/gi, "")
              .replace(/\s+/g, "-");

            return (
              <React.Fragment key={index}>
                {item.poster_path !== null && (
                  <Link
                    href={`/movie/${item.id}/${formattedTitle}`}
                    key={index}
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
      )}
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
    </main>
  );
};

export default function Page({
  params,
}: {
  params: { id: string; genre: string };
}) {
  const { id, genre } = params;
  return <CategoryPage title={genre} genreID={id} />;
}