import MediaGrid from '@/components/media-grid';
import { baseUrl } from '@/lib/base-url';
import type { Metadata } from 'next';

const canonical = `${baseUrl}/movies`;

export const metadata: Metadata = {
  title: 'Popular Movies',
  description: 'Filmax Popular Movies page',
  alternates: {
    canonical,
  },
  openGraph: {
    title: 'Popular Movies',
    description: 'Filmax Popular Movies page',
    url: canonical,
  },
};

export default function Movies() {
  return (
    <section className="min-h-screen overflow-hidden">
      <MediaGrid title="Popular" subtitle="movies" fetchType="popular" />
    </section>
  );
}
