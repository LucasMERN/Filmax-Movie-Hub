import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full">
      <Nav />
      {children}
      <Footer />
    </section>
  );
}
