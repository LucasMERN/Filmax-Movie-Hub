import { Suspense } from 'react';
import Loading from './loading';
import Nav from '@/components/nav';
import Footer from '@/components/footer';

export default function MoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative min-h-screen">
      <Nav />
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <Footer />
    </section>
  );
}
