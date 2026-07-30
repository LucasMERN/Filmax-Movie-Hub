import MediaGrid from '@/components/media-grid';
import { baseUrl } from '@/lib/base-url';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Filmax | Popular Movies',
  description: 'Filmax Popular Movies page',
};

export default function Movies() {
  const canonical = `${baseUrl}/movies`;

  return (
    <>
      <head>
        <link rel="canonical" href={canonical} />
      </head>
      <section className="min-h-screen overflow-hidden">
        <MediaGrid title="Popular" subtitle="movies" fetchType="popular" />
      </section>
    </>
  );
}
