import MediaGrid from '@/components/media-grid';
import { baseUrl } from '@/lib/base-url';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Filmax | Trending Movies',
  description: 'Filmax Trending Movies page',
};

export default function Trending() {
  const canonical = `${baseUrl}/trending`;

  return (
    <>
      <head>
        <link rel="canonical" href={canonical} />
      </head>
      <section className="min-h-screen overflow-hidden">
        <MediaGrid title="Trending" subtitle="movies" fetchType="trending" />
      </section>
    </>
  );
}
