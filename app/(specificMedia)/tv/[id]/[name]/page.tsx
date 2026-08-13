import MediaPage from '@/components/media-page';
import {
  getContentRating,
  getCredits,
  getExternalId,
  getRecommended,
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
  const formattedTitle = name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  const canonical = `${baseUrl}/tv/${id}/${formattedTitle}`;
  const mediaData = await getSingle('tv', id);

  return {
    title: formattedTitle,
    description: `TV Series page for '${formattedTitle}'`,
    alternates: {
      canonical,
    },
    openGraph: {
      title: formattedTitle,
      description: `TV Series page for '${formattedTitle}'`,
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
      description: `TV Series page for '${formattedTitle}'`,
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
    const mediaData = await getSingle('tv', id);
    const recommendedShows = await getRecommended(id, 'tv');
    const castData = await getCredits(id, 'tv');
    const ratingData = await getContentRating('tv', id);
    const externalData = await getExternalId(id, 'tv');
    const youtubeData = await getYouTubeVideo(id, 'tv');

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
    console.error('Error fetching Data:', error);
  }
}
