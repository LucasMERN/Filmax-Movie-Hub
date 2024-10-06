import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function MediaGridSkeleton() {
  const data = new Array(20).fill(null);
  return (
    <section className="container grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
      {data.map((_, index) => (
        <Skeleton className="w-40 h-56" key={index} />
      ))}
    </section>
  );
}

export default MediaGridSkeleton;
