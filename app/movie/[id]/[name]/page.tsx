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
    description: `Movie page for '${formattedTitle}'`,
  };
}

export default async function Page({ params }: { params: { id: number } }) {
  try {
    const { id } = params;
    const mediaData = await getSingle("movie", id);
    const recommendedMovies = await getRecommended(id, "movie");
    const castData = await getCredits(id, "movie");
    const releaseData = await getRelease("movie", id);
    const externalData = await getExternalId(id, "movie");
    const youtubeData = await getYouTubeVideo(id, "movie");

    return (
      <main className="relative min-h-screen">
        <Nav />
        <MediaPage
          mediaType="movie"
          id={id}
          mediaData={mediaData}
          recommendedMovies={recommendedMovies?.results}
          cast={castData?.cast}
          movieRatingData={releaseData?.results}
          externalData={externalData}
          youtubeData={youtubeData?.results}
        />
        <Footer />
      </main>
    );
  } catch (error) {
    console.error("Error fetching Data:", error);
  }
}
