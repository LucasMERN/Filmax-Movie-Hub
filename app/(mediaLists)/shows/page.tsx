import MediaGrid from '@/components/media-grid';
import { baseUrl } from '@/lib/base-url';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Filmax | Popular TV Series',
  description: 'Filmax Popular TV Series page',
};

export default function Shows() {
  const canonical = `${baseUrl}/shows`;

  return (
    <>
      <head>
        <link rel="canonical" href={canonical} />
      </head>
      <section className="min-h-screen overflow-hidden">
        <MediaGrid title="Popular" subtitle="tv series" fetchType="popular" mediaType="tv" />
      </section>
    </>
  );
}
