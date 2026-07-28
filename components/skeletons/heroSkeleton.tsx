import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/heroCarousel';
import { Skeleton } from '@/components/ui/skeleton';

export default function HeroSkeleton() {
  const data = Array(10).fill(null);
  return (
    <>
      <Skeleton
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
        className="lg:h-[850px] h-[675px] w-full rounded-none bg-cover bg-center"
      />
      <div className="pt-36 text-3xl font-bold text-white lg:h-[790px] lg:text-6xl relative container mx-auto h-[650px]">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="my-2 h-10 w-1/4" />
        <div className="gap-4 flex flex-row items-center">
          <span className="rounded bg-amber-700 px-4 py-1 text-xl text-black h-fit">IMDB</span>
          <Skeleton className="h-8 w-1/6" />
        </div>
        <div className="-m-4 -mb-72 mt-16 gap-4 bg-black/60 p-4 sm:w-1/2 lg:hidden flex flex-col rounded-2xl">
          <Skeleton className="h-16 w-1/4" />
          <span className="h-8 bg-white px-4 text-base font-semibold inline-flex w-fit items-center justify-center rounded-md whitespace-nowrap text-secondary-foreground transition-colors hover:bg-secondary/80">
            Explore
          </span>
        </div>
        <Carousel
          opts={{
            align: 'end',
            direction: 'rtl',
            loop: true,
            duration: 40,
          }}
          className="mt-4 w-full"
        >
          <CarouselContent className="lg:visible invisible">
            {data.map((movie: any, index: number) => {
              return (
                <CarouselItem href="#" key={index} className="basis-1/3">
                  <div
                    className={`${index === 8 ? 'elevated mt-6 gap-2 p-1 flex flex-col items-center' : 'unelevated mt-6 gap-2 p-1 flex flex-col items-center'}`}
                  >
                    <Skeleton className="h-96 border-white shadow-lg relative w-full overflow-hidden border-4 bg-cover bg-center" />
                    {index == 8 ? <Skeleton className="mt-2 h-6 text-lg w-full text-center" /> : ''}
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
