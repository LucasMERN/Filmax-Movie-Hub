import { Suspense } from "react";
import Loading from "./loading";
import Nav from "@/Components/Nav";
import Footer from "@/Components/Footer";

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full">
      <Nav />
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <Footer />
    </section>
  );
}
