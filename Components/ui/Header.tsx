"use client";
import { gql, useQuery } from '@apollo/client';

export default function Header() {

  const query = gql`
    query GetMovie {
        title(id: "tt15398776") {
            id
            type
            primary_title
        }
    }
  `;

  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { id, type, primary_title } = data.title;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div>
        <h1>{primary_title}</h1>
        <p>ID: {id}</p>
        <p>Type: {type}</p>
      </div>
    </main>
  );
}