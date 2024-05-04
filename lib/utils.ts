import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTop10 = async () => {
  
  const res = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_original_language=en', {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTUwMjcxNzZiZTg1YjdjMTA4OTVkNWU1OGE4NDkyNSIsInN1YiI6IjY2MzU3YmU3YzkwNTRmMDEzMzhmNTY5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tadzdTMpihLH4Y7z71fs06sO0PwTQyWaEFQY5aqr3Aw'
    },
    cache: 'force-cache',
    next: { revalidate: 30600 }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data;
};
