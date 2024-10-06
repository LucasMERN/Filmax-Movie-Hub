import { getSingle } from "@/lib/api";
import Link from "next/link";

interface CallToActionTypes {
  id: number;
  color: string;
  mediaType: string;
}

interface CallToActionData {
  backdrop_path: string;
  name: string;
  genres: [];
  created_by: [];
  overview: string;
}

async function CallToAction({ id, color, mediaType }: CallToActionTypes) {
  try {
    const mediaData = await getSingle(mediaType, id);

    const formattedTitle = (
      mediaType === "tv" ? mediaData?.name : mediaData?.title
    )
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");

    return (
      <>
        <section
          className="hidden w-full py-24 text-white lg:block"
          style={{
            backgroundImage: `linear-gradient(to right, ${color} 30%, transparent 60%), url(https://image.tmdb.org/t/p/original/${mediaData?.backdrop_path})`,
            backgroundPosition: "0% 10%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="container">
            <div className="flex w-1/2 flex-col gap-8">
              <h3 className="text-2xl font-bold tracking-wider">
                {mediaType === "tv" ? mediaData?.name : mediaData?.title}
              </h3>
              <div className="flex flex-row flex-wrap items-center">
                <span className="text-lg font-medium">Category:</span>
                {mediaData?.genres.map((genres: any, index: number) => (
                  <Link
                    key={index}
                    href={`/categories/${genres.id}/${genres.name}`}
                    className={`${mediaData.genres.length - 1 === index ? "" : "border-r-2"} px-2 leading-none hover:underline`}
                  >
                    {genres.name}
                  </Link>
                ))}
              </div>
              <div className="flex flex-row items-center">
                <span className="text-lg font-medium">Director:</span>
                {mediaData?.created_by.map((director: any, index: number) => (
                  <Link
                    href={`/person/${director.id}/${director.name}`}
                    key={index}
                    className="px-2 hover:underline"
                  >
                    {director.name}
                  </Link>
                ))}
              </div>
              <div className="w-1/2">{mediaData?.overview}</div>
              <Link
                href={`${mediaType}/${id}/${formattedTitle}`}
                className="hover:bg-secondary/80 inline-flex h-8 w-fit items-center justify-center whitespace-nowrap rounded-md bg-white px-4 text-base font-semibold text-secondary-foreground transition-colors"
              >
                Explore
              </Link>
            </div>
          </div>
        </section>
        <section
          className="w-full py-24 text-white lg:hidden"
          style={{
            backgroundImage: `linear-gradient(to top, ${color} 45%, transparent 80%), url(https://image.tmdb.org/t/p/original/${mediaData?.backdrop_path})`,
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="container">
            <div className="flex flex-col gap-8">
              <h3 className="dark-shadow text-2xl font-bold tracking-wider">
                {mediaType === "tv" ? mediaData?.name : mediaData?.title}
              </h3>
              <div className="flex flex-row items-center">
                <span className="dark-shadow text-lg font-medium">
                  Category:
                </span>
                {mediaData?.genres.map((genres: any, index: number) => (
                  <span
                    key={index}
                    className={`${mediaData?.genres.length - 1 === index ? "" : "border-r-2"} dark-shadow px-2 leading-none`}
                  >
                    {genres.name}
                  </span>
                ))}
              </div>
              <div className="flex flex-row items-center">
                <span className="dark-shadow text-lg font-medium">
                  Director:
                </span>
                {mediaData?.created_by.map((director: any, index: number) => (
                  <span key={index} className="dark-shadow px-2">
                    {director.name}
                  </span>
                ))}
              </div>
              <div className="dark-shadow">{mediaData?.overview}</div>
              <Link
                href={`${mediaType}/${id}/${formattedTitle}`}
                className="hover:bg-secondary/80 inline-flex h-8 w-fit items-center justify-center whitespace-nowrap rounded-md bg-white px-4 text-base font-semibold text-secondary-foreground transition-colors"
              >
                Explore
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error("Error in Test component:", error);
    return <div>Error</div>;
  }
}

export default CallToAction;
