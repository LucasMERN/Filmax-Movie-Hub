'use client'
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import { AspectRatio } from "@/Components/ui/aspect-ratio"

export default function Header() {

  const query = gql`
    query GetMovie {
        title(id: "tt15398776") {
            id
            type
            primary_title
            rating {
              aggregate_rating
            }
            posters {
              url
            }
        }
    }
  `;

  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { id, type, primary_title, posters, rating } = data.title;

  return (
      <div 
        style={{ backgroundImage: `url(${posters[0].url})`, backgroundPosition:'center' }}
        className='w-full h-[1000px] bg-cover bg-center'>
        <div className='container mx-auto pt-60 text-6xl text-white font-bold flex flex-col gap-6'>
          <h1>{primary_title}</h1>
          <div className='flex flex-row gap-4 items-center'>
            <span className='px-4 py-1 bg-amber-700 text-black text-xl rounded h-fit'>IMDB</span>
            <span className='text-3xl font-medium'>{rating.aggregate_rating} / 10</span>
          </div>
        </div>
        
      </div>
  );
}