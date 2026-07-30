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
    description: `TV Series page for '${formattedTitle}'`,
  };
}

export default async function Page({ params }: { params: Promise<{ name: string; id: string }> }) {
  try {
    const { id, name } = await params;
    const formattedTitle = name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    const mediaData = await getSingle('tv', id);
    const recommendedShows = await getRecommended(id, 'tv');
    const castData = await getCredits(id, 'tv');
    const ratingData = await getContentRating('tv', id);
    const externalData = await getExternalId(id, 'tv');
    const youtubeData = await getYouTubeVideo(id, 'tv');

    const canonical = `${baseUrl}/tv/${id}/${formattedTitle}`;

    return (
      <>
        <head>
          <link rel="canonical" href={canonical} />
        </head>
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
      </>
    );
  } catch (error) {
    console.error('Error fetching Data:', error);
  }
}
