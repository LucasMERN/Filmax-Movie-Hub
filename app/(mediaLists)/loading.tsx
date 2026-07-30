import MediaGridSkeleton from '@/components/skeletons/media-grid-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <section className="min-h-screen overflow-hidden">
      <div className="container flex w-full flex-col gap-2 pt-24 pb-12 md:pt-48">
        <Skeleton className="h-9 w-48 text-4xl font-bold tracking-wider text-white capitalize" />
        <Skeleton className="h-6 w-32 text-sm font-medium tracking-widest text-white/60 uppercase" />
      </div>
      <MediaGridSkeleton />
    </section>
  );
}
