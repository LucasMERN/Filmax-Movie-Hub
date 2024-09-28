import PersonPage from "@/components/personPage"
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const formattedTitle = params.name
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
  return {
    title: `Filmax | ${formattedTitle}`,
    description: `Biography page for '${formattedTitle}'`,
  };
}

export default function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  return <PersonPage id={id} />;
}
