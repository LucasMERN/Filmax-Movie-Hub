import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/Carousel";
import { Card, CardContent } from "@/Components/ui/card";

interface CarouselProps {
  data: any[];
}

const ProductCarousel: React.FC<CarouselProps> = ({ data }) => {
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
      <CarouselContent className="w-11/12 ml-11">
        {data.map((content: any, index: number) => (
          <CarouselItem key={index} className="basis-1/6">
            <div className="mt-6 flex flex-col items-center gap-2 p-1">
              <Card
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${content?.poster_path})`,
                  backgroundPosition: "center",
                }}
                className="h-96 w-full bg-cover bg-center shadow-lg"
              >
                <CardContent />
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
