import { Suspense } from "react";
import LoadingSkeleton from "./loading";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full">
      <Nav />
      <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
      <Footer />
    </section>
  );
}
