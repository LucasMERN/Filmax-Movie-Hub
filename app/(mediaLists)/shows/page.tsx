import MediaGrid from '@/components/media-grid';
import { baseUrl } from '@/lib/base-url';
import type { Metadata } from 'next';

const canonical = `${baseUrl}/shows`;

export const metadata: Metadata = {
  title: 'Popular TV Series',
  description: 'Filmax Popular TV Series page',
  alternates: {
    canonical,
  },
  openGraph: {
    title: 'Popular TV Series',
    description: 'Filmax Popular TV Series page',
    url: canonical,
  },
};

export default function Shows() {
  return (
    <section className="min-h-screen overflow-hidden">
      <MediaGrid title="Popular" subtitle="tv series" fetchType="popular" mediaType="tv" />
    </section>
  );
}
