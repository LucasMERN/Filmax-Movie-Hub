import PersonPage from "@/components/personPage";
import { getPerson, getPersonCredit, getPersonExternalId } from "@/lib/api";
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
    description: `Biography page for '${formattedTitle}'`,
  };
}

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  try {
    const personData = await getPerson(id);
    const personCredit = await getPersonCredit(id);
    const personID = await getPersonExternalId(id);

    return (
      <PersonPage
        personData={personData}
        personCredit={personCredit?.cast}
        personID={personID}
      />
    );
  } catch (error) {
    console.error("Error fetching Data:", error);
  }
}
