import { Suspense } from "react";
import Loading from "./loading";
import Footer from "@/Components/Footer";
import Nav from "@/Components/Nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <section className="w-full">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </section>
      <Footer />
    </>
  );
}
