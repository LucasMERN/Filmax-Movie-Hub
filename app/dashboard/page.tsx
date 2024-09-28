import CallToAction from "@/components/callToAction";
import DashboardCarousels from "@/components/dashboardCarousel";
import Hero from "@/components/hero";
import SearchFilter from "@/components/searchFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filmax | Home",
  description: "Home page for Filmax Cinema Hub",
};

export default function Dashboard() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Hero />
      <div className="flex flex-col items-center gap-20">
        <div className="container">
          <SearchFilter />
        </div>
        <DashboardCarousels>
          <CallToAction id={95396} color="#007D4D" mediaType={"tv"} />
        </DashboardCarousels>
      </div>
    </main>
  );
}
