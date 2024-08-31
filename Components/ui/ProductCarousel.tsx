import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { Card, CardContent } from "@/Components/ui/card";
import BackgroundImage from "./BackgroundImage";

interface CarouselProps {
  data: any[];
  width?: string;
}

const ProductCarousel: React.FC<CarouselProps> = ({ data, width = "basis-1/6" }) => {
  return (
    <Carousel
      opts={{
        align: "start",
        direction: "ltr",
        loop: true,
        duration: 40,
      }}
      className="w-full"
      orientation="horizontal"
    >
      <CarouselContent className="w-11/12">
        {data.map((content: any, index: number) => (
          <CarouselItem key={index} className={width}>
            <div className="mt-6 flex flex-col items-center gap-2 p-1">
              <Card className="h-96 w-full bg-cover bg-center shadow-lg overflow-hidden">
                <BackgroundImage src={`https://image.tmdb.org/t/p/original/${content?.poster_path}`} alt={`https://image.tmdb.org/t/p/original/${content?.overview}`} />
              </Card>
              {!content?.title ? (
                <span className="break-words text-center text-white">
                  {content?.original_name}
                </span>
              ) : (
                <span className="break-words text-center text-white">
                  {content?.title}
                </span>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden" />
      <CarouselNext className="hidden" />
    </Carousel>
  );
};

export default ProductCarousel;