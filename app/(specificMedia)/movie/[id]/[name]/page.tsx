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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; name: string }>;
}): Promise<Metadata> {
  const { id, name } = await params;
  const mediaData = await getSingle('movie', id);
  const formattedTitle = name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  const canonical = `${baseUrl}/movie/${id}/${formattedTitle}`;

  return {
    title: formattedTitle,
    description: `Movie page for '${formattedTitle}'`,
    alternates: {
      canonical,
    },
    openGraph: {
      title: formattedTitle,
      description: `Movie page for '${formattedTitle}'`,
      url: canonical,
      images: [
        {
          url: `https://image.tmdb.org/t/p/original${mediaData?.backdrop_path}`,
          alt: `Backdrop image for ${formattedTitle}`,
        },
      ],
    },
    twitter: {
      title: formattedTitle,
      description: `Movie page for '${formattedTitle}'`,
      images: [
        {
          url: `https://image.tmdb.org/t/p/original${mediaData?.backdrop_path}`,
          alt: `Backdrop image for ${formattedTitle}`,
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const mediaData = await getSingle('movie', id);
    const recommendedMovies = await getRecommended(id, 'movie');
    const castData = await getCredits(id, 'movie');
    const releaseData = await getRelease('movie', id);
    const externalData = await getExternalId(id, 'movie');
    const youtubeData = await getYouTubeVideo(id, 'movie');

    return (
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
    );
  } catch (error) {
    console.error('Error fetching Data:', error);
  }
}
