import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTop10 = async () => {
  const res = await fetch(
    "https://imdb188.p.rapidapi.com/api/v1/getWeekTop10",
    {
      method: "GET",
      headers: {
        'X-RapidAPI-Key': 'a35ca79fe7msh8dcb3cad3ec1594p1543cejsn542bead5bd54',
        'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data;
};
