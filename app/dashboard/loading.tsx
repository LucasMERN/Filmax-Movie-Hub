import CallToActionSkelton from '@/components/skeletons/callToActionSkeleton';
import HeroSkeleton from '@/components/skeletons/heroSkeleton';
import ProductCarouselSkeleton from '@/components/skeletons/productCarouselSkeleton';
import SearchFilterSkeleton from '@/components/skeletons/searchFilterSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className="min-h-screen overflow-hidden">
      <HeroSkeleton />
      <div className="gap-20 flex flex-col items-center">
        <div className="container">
          <SearchFilterSkeleton />
        </div>
        <div className="pr-0 container">
          <div className="-mb-4 gap-4 px-1 pr-8 text-white lg:pr-12 relative z-10 flex flex-row items-baseline">
            <Skeleton className="h-8 w-32 text-xl font-semibold" />
            <Skeleton className="h-6 w-16 text-sm font-extralight" />
          </div>
          <ProductCarouselSkeleton />
        </div>
        <div className="pr-0 container">
          <div className="-mb-4 gap-4 px-1 pr-8 text-white lg:pr-12 relative z-10 flex flex-row items-baseline">
            <Skeleton className="h-8 w-32 text-xl font-semibold" />
            <Skeleton className="h-6 w-16 text-sm font-extralight" />
          </div>
          <ProductCarouselSkeleton />
        </div>
        <CallToActionSkelton />
        <div className="pr-0 container">
          <div className="-mb-4 gap-4 px-1 pr-8 text-white lg:pr-12 relative z-10 flex flex-row items-baseline">
            <Skeleton className="h-8 w-32 text-xl font-semibold" />
            <Skeleton className="h-6 w-16 text-sm font-extralight" />
          </div>
          <ProductCarouselSkeleton />
        </div>
        <div className="pr-0 container">
          <div className="-mb-4 gap-4 px-1 pr-8 text-white lg:pr-12 relative z-10 flex flex-row items-baseline">
            <Skeleton className="h-8 w-32 text-xl font-semibold" />
            <Skeleton className="h-6 w-16 text-sm font-extralight" />
          </div>
          <ProductCarouselSkeleton />
        </div>
      </div>
    </main>
  );
}
