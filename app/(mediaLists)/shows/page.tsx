import MediaGrid from "@/components/mediaGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filmax | Popular TV Series",
  description: "Filmax Popular TV Series page",
};

export default function Shows() {

  return (
    <main className="min-h-screen overflow-hidden">
      <MediaGrid title="Popular" subtitle="tv series" fetchType="popular" mediaType="tv" />
    </main>
  );
}