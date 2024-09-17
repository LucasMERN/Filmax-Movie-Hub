import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchData = async (url: string) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: "no-store",
    next: { revalidate: 30600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
};

const apiUrl = "https://api.themoviedb.org/3";

export const getPerson = async (id: number) => {
  const url = `${apiUrl}/person/${id}&append_to_response=combined_credits`;
  return fetchData(url);
};

export const getPersonCredit = async (id: number) => {
  const url = `${apiUrl}/person/${id}/combined_credits`;
  return fetchData(url);
};

export const getPersonExternalId = async (id: number) => {
  const url = `${apiUrl}/person/${id}/external_ids`;
  return fetchData(url);
};

export const getRecommended = async (id: number, mediaType: string) => {
  const url = `${apiUrl}/${mediaType}/${id}/recommendations`;
  return fetchData(url);
};

export const getTop10 = async () => {
  const url = `${apiUrl}/trending/all/week?language=en-US`;
  return fetchData(url);
};

export const getRelease = async (mediaType: string, id: number) => {
  const url = `${apiUrl}/${mediaType}/${id}/release_dates`;
  return fetchData(url);
};

export const getContentRating = async (mediaType: string, id: number) => {
  const url = `${apiUrl}/${mediaType}/${id}/content_ratings`;
  return fetchData(url);
};

export const getSingle = async (mediaType: string, id: number) => {
  const url = `${apiUrl}/${mediaType}/${id}`;
  return fetchData(url);
};

export const getTvShowEpisodes = async (id: number, season: number) => {
  const url = `${apiUrl}/tv/${id}/season/${season}`;
  return fetchData(url);
};

export const getTrending = async (media: string, page: number) => {
  const url = `${apiUrl}/trending/${media}/week?page=${page}`;
  return fetchData(url);
};

export const getNewMovie = async (media: string, page: number) => {
  const url = `${apiUrl}/${media}/upcoming?language=en-US&page=${page}`;
  return fetchData(url);
};

export const getNewTV = async (
  media: string,
  page: number,
  formattedDate: string,
) => {
  const url = `${apiUrl}/discover/${media}?&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&first_air_date.gte=2022-11-01&first_air_date.lte=${formattedDate}&with_original_language=en`;
  return fetchData(url);
};

export const getPopular = async (media: string, page: number) => {
  const url = `${apiUrl}/${media}/top_rated?language=en-US&page=${page}`;
  return fetchData(url);
};

export const getAnimated = async (media: string, page: number) => {
  const url = `${apiUrl}/discover/${media}?include_adult=false&include_video=false&page=${page}&sort_by=popularity.asc&vote_count.gte=100&with_genres=16&with_original_language=en`;
  return fetchData(url);
};

export const getMediaByGenre = async (
  media: string,
  genreId: number,
  page: number,
) => {
  const url = `${apiUrl}/discover/${media}?with_genres=${genreId}&page=${page}`;
  return fetchData(url);
};

export const getGenreList = async (media: string) => {
  const url = `${apiUrl}/genre/${media}/list`;
  return fetchData(url);
};

export const searchMedia = async (query: string, page: number) => {
  const url = `${apiUrl}/search/multi?query=${query}&page=${page}`;
  return fetchData(url);
};

export const searchSpecificMedia = async (
  mediaType: string,
  query: string,
  page: number,
) => {
  const url = `${apiUrl}/search/${mediaType}?query=${query}&page=${page}`;
  return fetchData(url);
};

export const getExternalId = async (id: number, mediaType: string) => {
  const url = `${apiUrl}/${mediaType}/${id}/external_ids`;
  return fetchData(url);
};

export const getBackdrops = async (id: number, mediaType: string) => {
  const url = `${apiUrl}/${mediaType}/${id}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
  return fetchData(url);
};

export const getYouTubeVideo = async (id: number, mediaType: string) => {
  const url = `${apiUrl}/${mediaType}/${id}/videos`;
  return fetchData(url);
};

export const getCredits = async (id: number, type: string) => {
  const url = `${apiUrl}/${type}/${id}/credits`;
  return fetchData(url);
};

export const getWatchProviders = async (id: number) => {
  const url = `${apiUrl}/movie/${id}/watch/providers`;
  return fetchData(url);
};
