import ProductCarousel from "@/components/productCarousel";
import { getCredits } from "@/lib/api";
import { Cast } from "@/types/api";

const MediaPageCastCarousel = async ({
  castSectionRef,
  id,
}: {
  castSectionRef: React.RefObject<HTMLDivElement>;
  id: number;
}) => {
  try {
    const castData = await getCredits(id, "tv");

    return (
      <>
        {castData?.cast && castData?.cast.length > 0 && (
          <div
            className="flex flex-col items-center gap-20 overflow-hidden pt-16"
            ref={castSectionRef}
          >
            <div className="container pr-0">
              <div className="relative z-10 -mb-4 flex flex-row items-baseline gap-4 px-1 pr-8 text-white lg:pr-12">
                <h3 className="text-xl font-semibold">Cast</h3>
              </div>
              <ProductCarousel
                mediaType="person"
                loop={false}
                data={castData?.cast}
                width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              />
            </div>
          </div>
        )}
      </>
    );
  } catch (error) {
    console.error("Error:", error);
  }
};

export default MediaPageCastCarousel;
