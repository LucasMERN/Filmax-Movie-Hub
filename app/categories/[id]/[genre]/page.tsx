import MediaGrid from "@/components/mediaGrid";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { genre: string };
}): Promise<Metadata> {
  const { genre } = await params;
  const formattedTitle = decodeURIComponent(
    genre.charAt(0).toUpperCase() + genre.slice(1),
  );
  return {
    title: `Filmax | ${formattedTitle}`,
    description: `List of titles under the '${formattedTitle}' category`,
  };
}

export default async function Page({
  params,
}: {
  params: { id: string; genre: string };
}) {
  const { id, genre } = await params;
  const formattedGenre = decodeURIComponent(genre);
  return (
    <main className="min-h-screen overflow-hidden">
      <MediaGrid
        title={formattedGenre}
        fetchType="genre"
        subtitle="movies"
        genreID={id}
      />
    </main>
  );
}
