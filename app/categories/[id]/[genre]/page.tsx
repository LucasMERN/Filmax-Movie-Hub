import MediaGrid from '@/components/media-grid';
import { baseUrl } from '@/lib/base-url';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; genre: string }>;
}): Promise<Metadata> {
  const { id, genre } = await params;
  const formattedTitle = decodeURIComponent(genre.charAt(0).toUpperCase() + genre.slice(1));
  const canonical = `${baseUrl}/categories/${id}/${genre}`;

  return {
    title: `Filmax | ${formattedTitle}`,
    description: `List of titles under the '${formattedTitle}' category`,
    alternates: {
      canonical,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string; genre: string }> }) {
  const { id, genre } = await params;
  const formattedGenre = decodeURIComponent(genre);

  return (
    <section className="min-h-screen overflow-hidden">
      <MediaGrid title={formattedGenre} fetchType="genre" subtitle="movies" genreID={id} />
    </section>
  );
}
