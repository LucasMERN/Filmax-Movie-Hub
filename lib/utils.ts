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
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTUwMjcxNzZiZTg1YjdjMTA4OTVkNWU1OGE4NDkyNSIsInN1YiI6IjY2MzU3YmU3YzkwNTRmMDEzMzhmNTY5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tadzdTMpihLH4Y7z71fs06sO0PwTQyWaEFQY5aqr3Aw",
    },
    cache: "force-cache",
    next: { revalidate: 30600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
};

export const getTop10 = async (url: string) => {
  return fetchData(url);
};

export const getSearchItems = async (url: string) => {
  return fetchData(url);
};

export const getNewMovies = async (url: string) => {
  return fetchData(url);
};

export const getNewTV = async (url: string) => {
  return fetchData(url);
};

export const getPopular = async (url: string) => {
  return fetchData(url);
};

export const getAnimations = async (url: string) => {
  return fetchData(url);
};

export const getCallToAction = async (url: string) => {
  return fetchData(url);
};
