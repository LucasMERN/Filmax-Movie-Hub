import ProductCarouselSkeleton from "@/components/skeletons/productCarouselSkeleton";
import YoutubeSkeleton from "@/components/skeletons/youtubeSkeleton";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dot } from "lucide-react";

export default function Loading() {
  return (
    <>
      <section className="relative border-b-2 border-primary pb-14 pt-16">
        <div
          className="absolute left-0 top-0 z-[9] h-full w-full"
          style={{
            background: "linear-gradient(to top, black 0%, transparent 100%)",
          }}
        ></div>
        <Skeleton />
        <section className="container relative z-10 mb-14 flex flex-col gap-6 border-b border-white pb-14 pt-24">
          <Skeleton className="dark-shadow -mb-6 text-sm font-semibold uppercase tracking-widest text-white/60" />
          <Skeleton className="dark-shadow text-2xl font-bold tracking-wider text-white md:text-4xl" />
          <div className="flex items-center gap-4 text-white">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <div className="relative flex flex-row items-center gap-2">
            <Badge
              variant="outline"
              className="mr-2 w-fit rounded-md border-white text-sm font-medium text-white shadow-lg"
            >
              <Skeleton className="h-4 w-6" />
            </Badge>
            <Skeleton className="dark-shadow text-sm font-semibold text-white/60" />
            <Dot size={20} className="-mx-2 text-white/60" />
            <ul className="hidden flex-row gap-1 md:flex">
              {Array(3)
                .fill(null)
                .map((person: any, index: number) => (
                  <li
                    key={index}
                    className="dark-shadow whitespace-nowrap text-sm font-semibold text-white/60"
                  >
                    <Skeleton className="h-6 w-14" />
                  </li>
                ))}
            </ul>
            <span className="dark-shadow mb-[3px] hidden h-[1.2rem] overflow-hidden text-white/60 md:block">
              |
            </span>
            <div className="dark-shadow group group flex items-center gap-1 text-sm font-semibold text-white/60 underline-offset-2 hover:text-white hover:underline">
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
          <Skeleton className="flex h-8 w-48 items-center gap-2 px-3 shadow-lg"></Skeleton>
        </section>
        <section className="container relative z-10 flex w-full flex-col gap-8 lg:flex-row lg:gap-6">
          <Skeleton className="hidden w-44 rounded-lg border border-white shadow-2xl lg:block" />
          <div className="flex flex-col gap-3 md:w-1/2">
            <h2 className="dark-shadow -mb-2 text-lg font-semibold tracking-widest text-white">
              Description
            </h2>
            <Skeleton className="dark-shadow dark-shadow h-8 text-white/60 md:w-2/3"></Skeleton>
            <Skeleton className="dark-shadow dark-shadow h-8 text-white/60 md:w-1/2"></Skeleton>
            <Skeleton className="dark-shadow dark-shadow h-8 text-white/60 md:w-1/2"></Skeleton>
            <div className="flex gap-2 lg:mt-4">
              {Array(3)
                .fill(null)
                .map((name: any, index: number) => (
                  <Skeleton
                    key={index}
                    className={`h-6 w-16 rounded-full border-white px-3 py-1 text-sm font-medium text-white shadow-lg transition-all hover:bg-primary`}
                  ></Skeleton>
                ))}
            </div>
          </div>
          <YoutubeSkeleton />
        </section>
      </section>
      <div className="flex flex-col items-center gap-20 overflow-hidden pt-16">
        <div className="container pr-0">
          <div className="relative z-10 -mb-4 flex flex-row items-baseline gap-4 px-1 pr-8 text-white lg:pr-12">
            <h3 className="text-xl font-semibold">Cast</h3>
          </div>
          <ProductCarouselSkeleton />
        </div>
      </div>
      <div className="flex flex-col items-center gap-20 overflow-hidden pt-16">
        <div className="container pr-0">
          <div className="relative z-10 -mb-4 flex flex-row items-baseline gap-4 px-1 pr-8 text-white lg:pr-12">
            <h3 className="text-xl font-semibold">More Like This</h3>
          </div>
          <ProductCarouselSkeleton />
        </div>
      </div>
    </>
  );
}
