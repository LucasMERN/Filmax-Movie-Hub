import MediaGrid from '@/components/media-grid';
import { baseUrl } from '@/lib/base-url';
import type { Metadata } from 'next';

const canonical = `${baseUrl}/trending`;

export const metadata: Metadata = {
  title: 'Filmax | Trending Movies',
  description: 'Filmax Trending Movies page',
  alternates: {
    canonical,
  },
};

export default function Trending() {
  return (
    <section className="min-h-screen overflow-hidden">
      <MediaGrid title="Trending" subtitle="movies" fetchType="trending" />
    </section>
  );
}
