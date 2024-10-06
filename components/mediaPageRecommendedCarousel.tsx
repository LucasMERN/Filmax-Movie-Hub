import { getRecommended } from "@/lib/api";
import React from "react";
import ProductCarousel from "@/components/productCarousel";

async function MediaPageRecommendedCarousel({
  mediaType,
  id,
}: {
  mediaType: "movie" | "tv";
  id: number;
}) {
  try {
    const recommendedData = await getRecommended(id, mediaType);
    return (
      <>
        {recommendedData?.results.length > 0 && (
          <div className="flex flex-col items-center gap-20 overflow-hidden pt-16">
            <div className="container pr-0">
              <div className="relative z-10 -mb-4 flex flex-row items-baseline gap-4 px-1 pr-8 text-white lg:pr-12">
                <h3 className="text-xl font-semibold">More Like This</h3>
              </div>
              <ProductCarousel
                mediaType={mediaType}
                data={recommendedData?.results}
                width="min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              />
            </div>
          </div>
        )}
      </>
    );
  } catch (error) {
    console.error("Error in Test component:", error);
    return <div>Error</div>;
  }
}

export default MediaPageRecommendedCarousel;
