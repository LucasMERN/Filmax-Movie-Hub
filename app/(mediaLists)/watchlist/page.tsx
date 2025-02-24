import { getUserID, getWatchlist } from "@/actions/user.action";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Filmax | Watchlist",
  description: "Add Media to Your Watchlist",
};

export default async function Watchlist() {
  const id = await getUserID();
  const records = await getWatchlist(id);

  return (
    <main className="min-h-screen overflow-hidden">
      <div className="container flex w-full flex-col gap-2 pb-12 pt-24 md:pt-48">
        <h1 className="text-4xl font-bold capitalize tracking-wider text-white">
          Watchlist
        </h1>
        <span className="text-sm font-medium uppercase tracking-widest text-white/60">
          Movies & TV
        </span>
      </div>
      <section className="container grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {records.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="group w-full overflow-hidden"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${item.poster_image}`}
              width={342}
              height={513}
              className="h-full object-cover transition-transform group-hover:scale-105"
              alt={`Poster image for ${item.title}`}
              loading="lazy"
              unoptimized
            />
          </Link>
        ))}
      </section>
    </main>
  );
}
