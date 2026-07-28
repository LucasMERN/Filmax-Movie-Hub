import MediaGridSkeleton from '@/components/skeletons/mediaGridSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="gap-2 pb-12 pt-24 md:pt-48 container flex w-full flex-col">
        <Skeleton className="h-9 w-48 text-4xl font-bold tracking-wider text-white capitalize" />
        <Skeleton className="h-6 w-32 text-sm font-medium tracking-widest text-white/60 uppercase" />
      </div>
      <MediaGridSkeleton />
    </main>
  );
}
