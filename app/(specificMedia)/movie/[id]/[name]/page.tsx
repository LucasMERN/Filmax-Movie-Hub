import MediaPage from '@/components/media-page';
import {
  getCredits,
  getExternalId,
  getRecommended,
  getRelease,
  getSingle,
  getYouTubeVideo,
} from '@/lib/api';
import { baseUrl } from '@/lib/base-url';
import type { Metadata } from 'next';

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const formattedTitle = name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return {
    title: `Filmax | ${formattedTitle}`,
    description: `Movie page for '${formattedTitle}'`,
  };
}

export default async function Page({ params }: { params: Promise<{ id: string, name: string }> }) {
  try {
    const { id, name } = await params;
    const formattedTitle = name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    const mediaData = await getSingle('movie', id);
    const recommendedMovies = await getRecommended(id, 'movie');
    const castData = await getCredits(id, 'movie');
    const releaseData = await getRelease('movie', id);
    const externalData = await getExternalId(id, 'movie');
    const youtubeData = await getYouTubeVideo(id, 'movie');

    const canonical = `${baseUrl}/movie/${id}/${formattedTitle}`;

    return (
      <>
      <head>
        <link rel="canonical" href={canonical} />
      </head>
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
      </>
    );
  } catch (error) {
    console.error('Error fetching Data:', error);
  }
}
