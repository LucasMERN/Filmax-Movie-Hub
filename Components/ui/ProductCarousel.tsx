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
        align: "end",
        direction: "rtl",
        loop: true,
        duration: 40,
      }}
      className="mt-8 w-full"
    >
      <CarouselContent>
        {data.map((content: any, index: number) => (
          <CarouselItem key={index} className="basis-1/3">
            <div className="mt-6 flex flex-col items-center gap-2 p-1">
              <Card
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${content?.poster_path})`,
                  backgroundPosition: "center",
                }}
                className="w-full bg-cover bg-center shadow-lg"
              >
                <CardContent />
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ProductCarousel;
