import ProductCarouselSkeleton from '@/components/skeletons/productCarouselSkeleton';
import YoutubeSkeleton from '@/components/skeletons/youtubeSkeleton';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dot } from 'lucide-react';

export default function Loading() {
  return (
    <>
      <section className="pb-14 pt-16 relative border-b-2 border-primary">
        <div
          className="left-0 top-0 absolute z-[9] h-full w-full"
          style={{
            background: 'linear-gradient(to top, black 0%, transparent 100%)',
          }}
        ></div>
        <Skeleton />
        <section className="mb-14 gap-6 border-white pb-14 pt-24 relative z-10 container flex flex-col border-b">
          <Skeleton className="dark-shadow -mb-6 text-sm font-semibold tracking-widest text-white/60 uppercase" />
          <Skeleton className="dark-shadow text-2xl font-bold tracking-wider text-white md:text-4xl" />
          <div className="gap-4 text-white flex items-center">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <div className="gap-2 relative flex flex-row items-center">
            <Badge
              variant="outline"
              className="mr-2 border-white text-sm font-medium text-white shadow-lg w-fit rounded-md"
            >
              <Skeleton className="h-4 w-6" />
            </Badge>
            <Skeleton className="dark-shadow text-sm font-semibold text-white/60" />
            <Dot size={20} className="-mx-2 text-white/60" />
            <ul className="gap-1 md:flex hidden flex-row">
              {Array(3)
                .fill(null)
                .map((person: any, index: number) => (
                  <li
                    key={index}
                    className="dark-shadow text-sm font-semibold text-white/60 whitespace-nowrap"
                  >
                    <Skeleton className="h-6 w-14" />
                  </li>
                ))}
            </ul>
            <span className="dark-shadow text-white/60 md:block mb-[3px] hidden h-[1.2rem] overflow-hidden">
              |
            </span>
            <div className="dark-shadow group group gap-1 text-sm font-semibold text-white/60 hover:text-white flex items-center underline-offset-2 hover:underline">
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
          <Skeleton className="h-8 w-48 gap-2 px-3 shadow-lg flex items-center"></Skeleton>
        </section>
        <section className="gap-8 lg:flex-row lg:gap-6 relative z-10 container flex w-full flex-col">
          <Skeleton className="w-44 border-white shadow-2xl lg:block hidden rounded-lg border" />
          <div className="gap-3 md:w-1/2 flex flex-col">
            <h2 className="dark-shadow -mb-2 text-lg font-semibold tracking-widest text-white">
              Description
            </h2>
            <Skeleton className="dark-shadow dark-shadow h-8 text-white/60 md:w-2/3"></Skeleton>
            <Skeleton className="dark-shadow dark-shadow h-8 text-white/60 md:w-1/2"></Skeleton>
            <Skeleton className="dark-shadow dark-shadow h-8 text-white/60 md:w-1/2"></Skeleton>
            <div className="gap-2 lg:mt-4 flex">
              {Array(3)
                .fill(null)
                .map((name: any, index: number) => (
                  <Skeleton
                    key={index}
                    className={`h-6 w-16 border-white px-3 py-1 text-sm font-medium text-white shadow-lg rounded-full transition-all hover:bg-primary`}
                  ></Skeleton>
                ))}
            </div>
          </div>
          <YoutubeSkeleton />
        </section>
      </section>
      <div className="gap-20 pt-16 flex flex-col items-center overflow-hidden">
        <div className="pr-0 container">
          <div className="-mb-4 gap-4 px-1 pr-8 text-white lg:pr-12 relative z-10 flex flex-row items-baseline">
            <h3 className="text-xl font-semibold">Cast</h3>
          </div>
          <ProductCarouselSkeleton />
        </div>
      </div>
      <div className="gap-20 pt-16 flex flex-col items-center overflow-hidden">
        <div className="pr-0 container">
          <div className="-mb-4 gap-4 px-1 pr-8 text-white lg:pr-12 relative z-10 flex flex-row items-baseline">
            <h3 className="text-xl font-semibold">More Like This</h3>
          </div>
          <ProductCarouselSkeleton />
        </div>
      </div>
    </>
  );
}
