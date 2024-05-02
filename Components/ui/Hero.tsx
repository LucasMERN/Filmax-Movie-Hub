import Image from "next/image";
import { getTop10 } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel";
import { Card, CardContent } from "@/Components/ui/card";

const Hero = async () => {
  const top10 = await getTop10();

  // top10.data.forEach((movie: { titleText: { text: any; }; }) => {
  //   console.log(movie.titleText.text);
  // });

  return (
    <div
      style={{ backgroundImage: `url()`, backgroundPosition: "center" }}
      className="w-full h-[1000px] bg-cover bg-center"
    >
      <div className="container mx-auto pt-60 text-6xl text-white font-bold flex flex-col gap-6">
        <h1>{}</h1>
        <div className="flex flex-row gap-4 items-center">
          <span className="px-4 py-1 bg-amber-700 text-black text-xl rounded h-fit">
            IMDB
          </span>
          <span className="text-3xl font-medium">{} / 10</span>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-sm mt-20"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}

export default Hero;