import MediaGrid from '@/components/media-grid';
import { baseUrl } from '@/lib/base-url';
import type { Metadata } from 'next';

const canonical = `${baseUrl}/trending`;

export const metadata: Metadata = {
  title: 'Trending Movies',
  description: 'Filmax Trending Movies page',
  alternates: {
    canonical,
  },
  openGraph: {
    title: 'Trending Movies',
    description: 'Filmax Trending Movies page',
    url: canonical,
  },
};

export default function Trending() {
  return (
    <section className="min-h-screen overflow-hidden">
      <MediaGrid title="Trending" subtitle="movies" fetchType="trending" />
    </section>
  );
}
