import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/heroCarousel";
import { Skeleton } from "@/components/ui/skeleton";

export default function HeroSkeleton() {
  const data = Array(10).fill(null);
  return (
    <>
      <Skeleton
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
        className="h-[675px] w-full rounded-none bg-cover bg-center lg:h-[850px]"
      />
      <div className="container relative mx-auto h-[650px] pt-36 text-3xl font-bold text-white lg:h-[790px] lg:text-6xl">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="my-2 h-10 w-1/4" />
        <div className="flex flex-row items-center gap-4">
          <span className="h-fit rounded bg-amber-700 px-4 py-1 text-xl text-black">
            IMDB
          </span>
          <Skeleton className="h-8 w-1/6" />
        </div>
        <div className="-m-4 -mb-72 mt-16 flex flex-col gap-4 rounded-2xl bg-black/60 p-4 sm:w-1/2 lg:hidden">
          <Skeleton className="h-16 w-1/4" />
          <span className="hover:bg-secondary/80 inline-flex h-8 w-fit items-center justify-center whitespace-nowrap rounded-md bg-white px-4 text-base font-semibold text-secondary-foreground transition-colors">
            Explore
          </span>
        </div>
        <Carousel
          opts={{
            align: "end",
            direction: "rtl",
            loop: true,
            duration: 40,
          }}
          className="mt-4 w-full"
        >
          <CarouselContent className="invisible lg:visible">
            {data.map((movie: any, index: number) => {
              return (
                <CarouselItem href="#" key={index} className="basis-1/3">
                  <div
                    className={`${index === 8 ? "elevated mt-6 flex flex-col items-center gap-2 p-1" : "unelevated mt-6 flex flex-col items-center gap-2 p-1"}`}
                  >
                    <Skeleton className="relative h-96 w-full overflow-hidden border-4 border-white bg-cover bg-center shadow-lg" />
                    {index == 8 ? (
                      <Skeleton className="mt-2 h-6 w-full text-center text-lg" />
                    ) : (
                      ""
                    )}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}
