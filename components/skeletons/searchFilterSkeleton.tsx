import { Skeleton } from "@/components/ui/skeleton";

export default function SearchFilterSkeleton() {
  return (
    <div className="relative z-50 w-full rounded-3xl bg-foreground p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:gap-8">
        <div className="flex flex-row justify-between rounded-2xl bg-background px-2 py-4 md:gap-6 lg:px-6">
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-16" />
        </div>
        <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-6">
          <Skeleton className="h-[68px] w-full rounded-2xl px-6 text-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 lg:h-auto" />
          <Skeleton className="h-full w-36" />
        </div>
      </div>
    </div>
  );
}
