"use client";

import { useEffect, SetStateAction, useState, useCallback } from "react";
import { searchSpecificMedia } from "@/lib/api";
import ProductCarousel from "@/components/productCarousel";
import { Button } from "@/components/ui/button";
import { Movie, Person, TV } from "@/types/api";

export default function SearchFilter() {
  const [searchResultsList, setSearchResultsList] = useState<
    Movie[] & TV[] & Person[]
  >([]);
  const [mediaType, setMediaType] = useState<"movie" | "tv" | "person">(
    "movie",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = useCallback(async () => {
    if (!searchTerm) return;
    try {
      const searchResults = await searchSpecificMedia(mediaType, searchTerm, 1);
      if (Array.isArray(searchResults?.results)) {
        setSearchResultsList(searchResults.results);
      } else {
        console.error("Data is not an array:", searchResults);
        setSearchResultsList([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResultsList([]);
    }
  }, [mediaType, searchTerm]);

  useEffect(() => {
    if (isSearchClicked) {
      handleSubmit();
    }
  }, [isSearchClicked, handleSubmit]);

  return (
    <div className="w-full rounded-3xl bg-foreground p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:gap-8">
        <div className="flex flex-row justify-between rounded-2xl bg-background px-2 py-4 md:gap-6 lg:px-6">
          <Button
            variant={mediaType === "movie" ? "default" : "ghost"}
            onClick={() => setMediaType("movie")}
          >
            Movies
          </Button>
          <Button
            variant={mediaType === "tv" ? "default" : "ghost"}
            onClick={() => setMediaType("tv")}
          >
            Series
          </Button>
          <Button
            variant={mediaType === "person" ? "default" : "ghost"}
            onClick={() => setMediaType("person")}
          >
            Person
          </Button>
        </div>
        <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-6">
          <input
            type="text"
            placeholder="Enter a keyword"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={(e) =>
              e.key === "Enter" ? setIsSearchClicked(true) : null
            }
            className="h-[68px] w-full rounded-2xl bg-background px-6 text-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 lg:h-auto"
          />
          <Button
            size="lg"
            className="h-[68px] rounded-2xl lg:h-auto"
            onClick={() => setIsSearchClicked(true)}
          >
            Search
          </Button>
        </div>
      </div>

      {searchTerm && isSearchClicked ? (
        searchResultsList.length > 0 ? (
          <div className="search-results overflow-hidden">
            <ProductCarousel
              mediaType={mediaType}
              data={searchResultsList}
              width="md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
            />
          </div>
        ) : (
          <div className="pt-4 text-lg font-medium text-white">
            No Results Found...
          </div>
        )
      ) : null}
    </div>
  );
}
