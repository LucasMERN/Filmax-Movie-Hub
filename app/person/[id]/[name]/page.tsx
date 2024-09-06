"use client";

import {
  getPerson,
  getPersonCredit,
  getPersonExternalId,
  getPersonPoster,
} from "@/lib/utils";
import { useEffect, useState } from "react";

type Data = {
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  profile_path: string;
};

const Person = ({ id }: { id: number }) => {
  const [personData, setPersonData] = useState<null | Data>(null);
  const [personPoster, setPersonPoster] = useState<null | Data>(null);
  const [personCredit, setPersonCredit] = useState<null | Data>(null);
  const [personID, setPersonID] = useState<null | Data>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const personData = await getPerson(id);
        const personPoster = await getPersonPoster(id);
        const personCredit = await getPersonCredit(id);
        const personID = await getPersonExternalId(id);

        if (personData) {
          setPersonData(personData);
          setPersonPoster(personPoster);
          setPersonCredit(personCredit);
          setPersonID(personID);
          console.log(personPoster, personCredit, personID);
        } else {
          setError("No data available");
        }
      } catch (error) {
        console.error("Error fetching Promo Data:", error);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!personData) return <div>No data available</div>;

  return (
    <div>
      <h1>{personData.name}</h1>
      <p>{personData.biography}</p>
    </div>
  );
};

export default function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  return <Person id={id} />;
}
