import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCarouselSkeleton() {
  const data = Array(12).fill(null);
  return (
    <Carousel
      opts={{
        align: "start",
        direction: "ltr",
        skipSnaps: true,
        loop: true,
      }}
      className="w-full"
      orientation="horizontal"
    >
      <CarouselContent className="w-11/12">
        {data.map((content, index) => (
          <React.Fragment key={index}>
            {content?.profile_path !== null &&
              content?.poster_path !== null && (
                <CarouselItem className="group mt-6 h-fit min-[475px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6">
                  <div className="flex flex-col items-center gap-2 p-1">
                    <Card className="relative h-96 w-full overflow-hidden bg-cover bg-center shadow-lg">
                      <Skeleton className="h-full w-full" />
                    </Card>
                    <Skeleton className="h-8 w-full" />
                  </div>
                </CarouselItem>
              )}
          </React.Fragment>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
