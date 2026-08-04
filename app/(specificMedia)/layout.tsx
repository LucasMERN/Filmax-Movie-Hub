import Nav from '@/components/nav';
import Footer from '@/components/footer';

export default function MoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative min-h-screen">
      <header>
        <Nav />
      </header>
      {children}
      <Footer />
    </section>
  );
}
