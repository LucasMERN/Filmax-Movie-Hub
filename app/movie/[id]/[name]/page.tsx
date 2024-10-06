import Footer from "@/components/footer";
import MediaPage from "@/components/mediaPage";
import Nav from "@/components/nav";
import { getCredits } from "@/lib/api";
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
    description: `Movie page for '${formattedTitle}'`,
  };
}

export default async function Page({ params }: { params: { id: number } }) {
  try {
    const castData = await getCredits(params.id, "movie");
    const { id } = params;
    return (
      <main className="relative min-h-screen">
        <Nav />
        <MediaPage mediaType="movie" id={id} castData={castData?.cast} />
        <Footer />
      </main>
    );
  } catch (error) {
    console.error("Error fetching Cast Data:", error);
  }
}
