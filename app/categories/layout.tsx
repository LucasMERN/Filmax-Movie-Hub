import Nav from '@/components/nav';
import Footer from '@/components/footer';

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="w-full">
        <Nav />
      </header>
      <section className="w-full">{children}</section>
      <Footer className="w-full" />
    </>
  );
}
