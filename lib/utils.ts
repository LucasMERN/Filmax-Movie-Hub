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
        `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
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

export const getHomepage = async (url: string) => {
  return fetchData(url);
};
