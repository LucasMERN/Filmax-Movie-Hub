import MediaGrid from "@/components/mediaGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filmax | My Watchlist",
  description: "Filmax watchlist",
};

export default function Watchlist() {
  return (
    <main className="min-h-screen overflow-hidden">
      <MediaGrid
        title="My Watchlist"
        subtitle="Movies & TV"
        fetchType="trending"
      />
    </main>
  );
}
