import Nav from '@/components/nav';
import Footer from '@/components/footer';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Nav />
      </header>
      <section className="w-full">{children}</section>
      <Footer className="w-full" />
    </>
  );
}
