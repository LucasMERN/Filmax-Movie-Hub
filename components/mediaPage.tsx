"use client";

import React, { useRef } from "react";
import MediaPageCastCarousel from "@/components/mediaPageCastCarousel";
import MediaPageHeader from "@/components/mediaPageHeader";
import MediaPageRecommendedCarousel from "@/components/mediaPageRecommendedCarousel";
import ScrollToCast from "@/components/scrollToCast";
import EpisodeGrid from "@/components/episodeGrid";
import { Movie, TV } from "@/types/api";

function MediaPage({
  mediaType,
  id,
  mediaData,
}: {
  mediaType: "movie" | "tv";
  id: number;
  mediaData: TV & Movie;
}) {
  const castSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToCast = () => {
    if (castSectionRef.current) {
      castSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <MediaPageHeader mediaType={mediaType} id={id} mediaData={mediaData}>
        <ScrollToCast scrollToCast={scrollToCast} />
      </MediaPageHeader>
      {mediaType === "tv" && <EpisodeGrid id={id} mediaData={mediaData} />}
      <MediaPageCastCarousel castSectionRef={castSectionRef} id={id} />
      <MediaPageRecommendedCarousel mediaType={mediaType} id={id} />
    </>
  );
}

export default MediaPage;
