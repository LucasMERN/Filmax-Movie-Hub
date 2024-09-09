import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/Components/ui/carousel";
import { Card } from "@/Components/ui/card";
import BackgroundImage from "@/Components/ui/BackgroundImage";

interface CarouselProps {
  data: any[];
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
        {data.map((content: any, index: number) => {
          const formattedTitle = (
            content?.original_name ||
            content?.title ||
            ""
          )
            .toLowerCase()
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "-");

          return (
            <>
              {content?.profile_path !== null &&
                content?.poster_path !== null && (
                  <CarouselItem
                    href={`/${mediaType}/${content?.id}/${formattedTitle}`}
                    key={content?.id}
                    className={`group ${width}`}
                  >
                    <div className="mt-6 flex flex-col items-center gap-2 p-1">
                      <Card className="relative h-96 w-full overflow-hidden bg-cover bg-center shadow-lg">
                        <BackgroundImage
                          src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${mediaType == "person" ? content?.profile_path : content?.poster_path}`}
                          alt={content?.overview || "Poster image"}
                          className="transition-transform group-hover:scale-105"
                        />
                      </Card>
                      <span className="break-words text-center text-white">
                        {content?.title || content?.original_name}
                      </span>
                    </div>
                  </CarouselItem>
                )}
            </>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default ProductCarousel;
