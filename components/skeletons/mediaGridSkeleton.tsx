import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function MediaGridSkeleton() {
  const data = new Array(59).fill(null);
  return (
    <section className="container grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
      {data.map((_, index) => (
        <Skeleton className="h-72 w-full rounded-none" key={index} />
      ))}
    </section>
  );
}

export default MediaGridSkeleton;
