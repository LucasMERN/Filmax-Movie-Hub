import MediaGrid from "@/components/mediaGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filmax | Popular Movies",
  description: "Filmax Popular Movies page",
};

export default function Movies() {

  return (
    <main className="min-h-screen overflow-hidden">
      <MediaGrid title="Popular" subtitle="movies" fetchType="popular" />
    </main>
  );
}
