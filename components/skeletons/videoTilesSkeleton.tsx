import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx";

interface VideoTilesSkeletonProps {
  className?: string;
}

export default function VideoTilesSkeleton({
  className,
}: VideoTilesSkeletonProps) {
  const marginClasses = [
    "",
    "md:mt-12",
    "md:mt-24",
    "md:mt-8",
    "md:-mt-4",
    "md:mt-24",
    "md:mt-12",
    "",
  ];

  return (
    <section
      className={clsx(
        "container pointer-events-none flex flex-col justify-between gap-4 pt-24 md:flex-row md:gap-0 md:pt-48",
        className,
      )}
    >
      {marginClasses.map((marginClass, index) => (
        <Skeleton
          key={index}
          className={clsx(
            marginClass,
            "h-[500px] w-full rounded-none md:w-[12%]",
          )}
        />
      ))}
    </section>
  );
}
