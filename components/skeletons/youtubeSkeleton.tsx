import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function YoutubeSkeleton() {

  return (
    <Skeleton className="aspect-video w-full rounded-lg border border-white object-contain shadow-lg md:w-1/2 lg:w-[400px]" />
  );
}
