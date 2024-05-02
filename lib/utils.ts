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
        "X-RapidAPI-Key": "3fb342082dmsh2a8a85384ba7173p1b6315jsn6476e64d0796",
        "X-RapidAPI-Host": "imdb188.p.rapidapi.com",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data;
};
