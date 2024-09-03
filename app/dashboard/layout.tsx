import { Suspense } from "react";
import Loading from "./loading";
import Nav from "@/Components/Nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full">
        <Nav />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </section>
  );
}
