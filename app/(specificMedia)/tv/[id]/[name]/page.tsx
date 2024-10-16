import Footer from "@/components/footer";
import MediaPage from "@/components/mediaPage";
import Nav from "@/components/nav";
import {
  getContentRating,
  getCredits,
  getExternalId,
  getRecommended,
  getRelease,
  getSingle,
  getYouTubeVideo,
} from "@/lib/api";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const formattedTitle = params.name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return {
    title: `Filmax | ${formattedTitle}`,
    description: `TV Series page for '${formattedTitle}'`,
  };
}

export default async function Page({ params }: { params: { id: number } }) {
  try {
    const { id } = params;
    const mediaData = await getSingle("tv", id);
    const recommendedShows = await getRecommended(id, "tv");
    const castData = await getCredits(id, "tv");
    const ratingData = await getContentRating("tv", id);
    const externalData = await getExternalId(id, "tv");
    const youtubeData = await getYouTubeVideo(id, "tv");

    return (
      <MediaPage
        mediaType="tv"
        id={id}
        mediaData={mediaData}
        recommendedShows={recommendedShows?.results}
        cast={castData?.cast}
        tvRatingData={ratingData?.results}
        externalData={externalData}
        youtubeData={youtubeData?.results}
      />
    );
  } catch (error) {
    console.error("Error fetching Data:", error);
  }
}
