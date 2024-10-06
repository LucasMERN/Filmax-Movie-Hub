import Footer from "@/components/footer";
import MediaPage from "@/components/mediaPage";
import Nav from "@/components/nav";
import { getCredits, getSingle } from "@/lib/api";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const formattedTitle = params.name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return {
    title: `Filmax | ${formattedTitle}`,
    description: `TV Series page for '${formattedTitle}'`,
  };
}

export default async function Page({ params }: { params: { id: number } }) {
  try {
    const { id } = params;
    const mediaData = await getSingle("tv", id);
    return (
      <main className="relative min-h-screen">
        <Nav />
        <MediaPage mediaType="tv" id={id} mediaData={mediaData} />
        <Footer />
      </main>
    );
  } catch (error) {
    console.error("Error fetching Cast Data:", error);
  }
}
