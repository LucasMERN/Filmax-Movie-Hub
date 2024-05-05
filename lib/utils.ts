import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchData = async (url: string) => {

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTUwMjcxNzZiZTg1YjdjMTA4OTVkNWU1OGE4NDkyNSIsInN1YiI6IjY2MzU3YmU3YzkwNTRmMDEzMzhmNTY5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tadzdTMpihLH4Y7z71fs06sO0PwTQyWaEFQY5aqr3Aw'
      },
      cache: 'force-cache',
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

export const getNewMovies = async () => {
  return fetchData('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_original_language=en');
};

export const getNewTV = async () => {
  return fetchData('https://api.themoviedb.org/3/discover/tv?&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&first_air_date.gte=2022-11-01&first_air_date.lte=2023-05-01');
};

export const getPopular = async () => {
  return fetchData('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_genres=16');
};

export const getAnimations = async () => {
  return fetchData('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_genres=16');
};