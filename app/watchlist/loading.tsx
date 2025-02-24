import MediaGridSkeleton from "@/components/skeletons/mediaGridSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="container flex w-full flex-col gap-2 pb-12 pt-24 md:pt-48">
        <Skeleton className="h-9 w-48 text-4xl font-bold capitalize tracking-wider text-white" />
        <Skeleton className="h-6 w-32 text-sm font-medium uppercase tracking-widest text-white/60" />
      </div>
      <MediaGridSkeleton />
    </main>
  );
}
