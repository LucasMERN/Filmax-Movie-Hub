import PersonPage from '@/components/person-page';
import { getPerson, getPersonCredit, getPersonExternalId } from '@/lib/api';
import { baseUrl } from '@/lib/base-url';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; name: string }>;
}): Promise<Metadata> {
  const { id, name } = await params;
  const personData = await getPerson(id);
  const formattedTitle = name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  const canonical = `${baseUrl}/person/${id}/${formattedTitle}`;

  return {
    title: formattedTitle,
    description: `Biography page for '${formattedTitle}'`,
    alternates: {
      canonical,
    },
    openGraph: {
      title: formattedTitle,
      description: `TV Series page for '${formattedTitle}'`,
      url: canonical,
      images: [
        {
          url: `https://image.tmdb.org/t/p/w342/${personData.profile_path}`,
          alt: `Backdrop image for ${formattedTitle}`,
        },
      ],
    },
    twitter: {
      title: formattedTitle,
      description: `TV Series page for '${formattedTitle}'`,
      images: [
        {
          url: `https://image.tmdb.org/t/p/w342/${personData.profile_path}`,
          alt: `Backdrop image for ${formattedTitle}`,
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const personData = await getPerson(id);
    const personCredit = await getPersonCredit(id);
    const personID = await getPersonExternalId(id);

    return (
      <PersonPage personData={personData} personCredit={personCredit?.cast} personID={personID} />
    );
  } catch (error) {
    console.error('Error fetching Data:', error);
  }
}
