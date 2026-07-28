import { Skeleton } from '@/components/ui/skeleton';

export default function SearchFilterSkeleton() {
  return (
    <div className="p-6 relative z-50 w-full rounded-3xl bg-foreground">
      <div className="gap-4 lg:flex-row lg:justify-between lg:gap-8 flex flex-col">
        <div className="px-2 py-4 md:gap-6 lg:px-6 flex flex-row justify-between rounded-2xl bg-background">
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-16" />
        </div>
        <div className="gap-4 lg:flex-row lg:gap-6 flex w-full flex-col">
          <Skeleton className="px-6 text-white lg:h-auto h-[68px] w-full rounded-2xl ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
          <Skeleton className="w-36 h-full" />
        </div>
      </div>
    </div>
  );
}
