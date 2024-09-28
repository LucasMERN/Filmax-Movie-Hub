import MediaGrid from "@/components/mediaGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filmax | Trending Movies",
  description: "Filmax Trending Movies page",
};

export default function Trending() {

  return (
    <main className="min-h-screen overflow-hidden">
      <MediaGrid title="Trending" subtitle="movies" fetchType="trending" />
    </main>
  );
}
