import MediaGrid from "@/components/mediaGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filmax | Watchlist",
  description: "Add Media to Your Watchlist",
};

export default function Trending() {
  return (
    <main className="min-h-screen overflow-hidden">
      <MediaGrid
        title="Watchlist"
        subtitle="movies & tv"
        fetchType="trending"
      />
    </main>
  );
}
