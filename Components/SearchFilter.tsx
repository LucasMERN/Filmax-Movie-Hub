import { SetStateAction, useState } from "react";
import { getSearchItems } from "@/lib/utils";
import ProductCarousel from "./ui/ProductCarousel";
import { Button } from "./ui/Button";

export default function SearchFilter() {
  const [searchResultsList, setSearchResultsList] = useState<any[]>([]);
  const [mediaType, setMediaType] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const searchResults = await getSearchItems(
        `https://api.themoviedb.org/3/search/${mediaType}?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
      );

      if (Array.isArray(searchResults?.results)) {
        if (mediaType == "person") {
          setSearchResultsList(searchResults.results[0].known_for);
        } else {
          setSearchResultsList(searchResults.results);
        }
      } else {
        console.error("Data is not an array:", searchResults);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="w-full rounded-3xl bg-foreground p-6">
      <form onSubmit={handleSubmit} className="flex flex-row justify-between">
        <div className="flex flex-row gap-6 rounded-2xl bg-background p-4">
          <Button
            variant={mediaType == "movie" ? "default" : "ghost"}
            onClick={() => setMediaType("movie")}
          >
            Movies
          </Button>
          <Button
            variant={mediaType == "tv" ? "default" : "ghost"}
            onClick={() => setMediaType("tv")}
          >
            Series
          </Button>
          <Button
            variant={mediaType == "person" ? "default" : "ghost"}
            onClick={() => setMediaType("person")}
          >
            Person
          </Button>
        </div>
        <div className="flex flex-row gap-6">
          <input
            type="text"
            placeholder="Enter a keyword"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-[400px] rounded-2xl bg-background px-6 text-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          />
          <Button size="lg" className="h-auto rounded-2xl" type="submit">
            Search
          </Button>
        </div>
      </form>
      {searchResultsList.length > 0 ? (
        <div className="overflow-hidden search-results">
          <ProductCarousel data={searchResultsList} />
        </div>
      ) : <div className=" pt-4 text-lg font-medium text-white">
      No Results Found...
    </div>}
    </div>
  );
}
