import PersonPage from '@/components/person-page';
import { getPerson, getPersonCredit, getPersonExternalId } from '@/lib/api';
import { baseUrl } from '@/lib/base-url';
import type { Metadata } from 'next';

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const formattedTitle = name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return {
    title: `Filmax | ${formattedTitle}`,
    description: `Biography page for '${formattedTitle}'`,
  };
}

export default async function Page({ params }: { params: Promise<{ id: string, name: string }> }) {
  try {
    const { id, name } = await params;
    const formattedTitle = name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    const personData = await getPerson(id);
    const personCredit = await getPersonCredit(id);
    const personID = await getPersonExternalId(id);
    
    const canonical = `${baseUrl}/person/${id}/${formattedTitle}`;

    return (
      <>
        <head>
          <link rel="canonical" href={canonical} />
        </head>
        <PersonPage personData={personData} personCredit={personCredit?.cast} personID={personID} />
      </>
    );
  } catch (error) {
    console.error('Error fetching Data:', error);
  }
}
