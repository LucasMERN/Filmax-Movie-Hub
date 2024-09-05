"use client";

import { getPromo } from "@/lib/utils";
import { useEffect, useState } from "react";

type Data = {
  backdrop_path: string;
  belongs_to_collection: {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
  };
  genres: {
    name: string;
  }[];
  homepage: string;
  id: number;
  original_title: string;
  title: string;
  overview: string;
  poster_path: string;
  production_companies: {
    name: string;
  }[];
  release_date: string;
  runtime: number;
  tagline: string;
  vote_average: string;
};

const MovieOrTVShow = ({
  id,
  mediaType,
}: {
  id: string;
  mediaType: "movie" | "tv";
}) => {
  const [data, setData] = useState<null | Data>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getPromo(
          `https://api.themoviedb.org/3/${mediaType}/${id}?language=en-US`,
        );

        if (data) {
          setData(data);
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
  }, [id, mediaType]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div>
      <h1>{data.original_title || data.title}</h1>
      <p>{data.overview}</p>
    </div>
  );
};

export default function Page({
  params,
}: {
  params: { mediaType: "movie" | "tv"; id: string };
}) {
  const { mediaType, id } = params;
  return <MovieOrTVShow id={id} mediaType={mediaType} />;
}
