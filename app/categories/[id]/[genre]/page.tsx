import MediaGrid from "@/components/mediaGrid";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { genre: string };
}): Promise<Metadata> {
  const formattedTitle = decodeURIComponent(params.genre.charAt(0).toUpperCase() + params.genre.slice(1));
  return {
    title: `Filmax | ${formattedTitle}`,
    description: `List of titles under the '${formattedTitle}' category`,
  };
}

export default function Page({
  params,
}: {
  params: { id: string; genre: string };
}) {
  const { id, genre } = params;
  const formattedGenre = decodeURIComponent(genre);
  return (
    <main className="min-h-screen overflow-hidden">
      <MediaGrid title={formattedGenre} fetchType="genre" subtitle="movies" genreID={id} />
    </main>
  )
}