import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import BackgroundImage from "@/components/ui/backgroundImage";
import React from "react";
import { Movie, TV } from "@/types/api";

interface CarouselProps {
  data: any;
  width?: string;
  loop?: boolean;
  mediaType: "tv" | "person" | "movie";
}

const ProductCarousel: React.FC<CarouselProps> = ({
  data,
  width = "basis-1/6",
  mediaType,
  loop = true,
}) => {
  return (
    <Carousel
      opts={{
        align: "start",
        direction: "ltr",
        skipSnaps: true,
        loop: loop,
      }}
      className="w-full"
      orientation="horizontal"
    >
      <CarouselContent className="w-11/12">
        {data !== null && data?.adult !== true &&
          data.map((content: any, index: number) => {
            const formattedTitle = (content?.name || content?.title || "")
              .toLowerCase()
              .replace(/[^\w\s]/gi, "")
              .replace(/\s+/g, "-");

            return (
              <React.Fragment key={index}>
                {content?.profile_path !== null &&
                  content?.poster_path !== null && (
                    <CarouselItem
                      href={`/${mediaType}/${content?.id}/${formattedTitle}`}
                      key={content?.id}
                      className={`group mt-6 ${width} h-fit`}
                    >
                      <div className="flex flex-col items-center gap-2 p-1">
                        <Card className="relative h-96 w-full overflow-hidden bg-cover bg-center shadow-lg">
                          <BackgroundImage
                            src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${mediaType == "person" ? content?.profile_path : content?.poster_path}`}
                            alt={
                              "Poster image for" + content?.title ||
                              "Poster image"
                            }
                            className="transition-transform group-hover:scale-105"
                          />
                        </Card>
                        <span className="break-words text-center text-white">
                          {content?.title || content?.name}
                        </span>
                      </div>
                    </CarouselItem>
                  )}
              </React.Fragment>
            );
          })}
      </CarouselContent>
    </Carousel>
  );
};

export default ProductCarousel;
