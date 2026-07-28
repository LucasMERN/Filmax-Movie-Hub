'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/heroCarousel';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import BackgroundImage from '@/components/ui/backgroundImage';
import Link from 'next/link';
import { Movie, TV } from '@/types/api';

const Hero = ({ data }: { data: Movie[] & TV[] }) => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(8);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedUpdateCurrentMovieIndex = useCallback(() => {
    if (!emblaApi) return;
    let newIndex = emblaApi.selectedScrollSnap();
    newIndex = (newIndex - 2 + data.length) % data.length;

    setIsImageVisible(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setCurrentMovieIndex(newIndex);
      setIsImageVisible(true);
    }, 500);
  }, [data.length, emblaApi]);

  const setApi = (api: CarouselApi) => {
    setEmblaApi(api);
  };

  useEffect(() => {
    if (!emblaApi) return;

    const handleSettle = () => {
      debouncedUpdateCurrentMovieIndex();
    };

    emblaApi.on('settle', handleSettle);

    return () => {
      emblaApi.off('settle', handleSettle);
    };
  }, [emblaApi, debouncedUpdateCurrentMovieIndex]);

  function handlePreviousClick() {
    setIsImageVisible(false);
    setTimeout(() => {
      setCurrentMovieIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
      setIsImageVisible(true);
    }, 1000);
  }

  function handleNextClick() {
    setIsImageVisible(false);
    setTimeout(() => {
      setCurrentMovieIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
      setIsImageVisible(true);
    }, 1000);
  }

  function truncateText(text: string, maxLength: number) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }

  const formattedTitle = (data[currentMovieIndex]?.name || data[currentMovieIndex]?.title || '')
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');

  return (
    <>
      <div
        onTransitionEnd={() => setIsImageVisible(true)}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${data[currentMovieIndex]?.backdrop_path})`,
          backgroundPosition: 'center',
          opacity: isImageVisible ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
        className="lg:h-[850px] h-[675px] w-full bg-cover bg-center"
      ></div>
      <div className="pt-36 text-3xl font-bold text-white lg:h-[790px] lg:text-6xl relative container mx-auto h-[650px]">
        <h1
          className="dark-shadow mb-4 tracking-widest"
          style={{
            opacity: isImageVisible ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        >
          {!data[currentMovieIndex]?.title
            ? data[currentMovieIndex]?.name
            : data[currentMovieIndex]?.title}
        </h1>
        <div className="gap-4 flex flex-row items-center">
          <span className="rounded bg-amber-700 px-4 py-1 text-xl text-black h-fit">IMDB</span>
          <span
            className="dark-shadow text-2xl font-medium"
            style={{
              opacity: isImageVisible ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
            }}
          >
            {data[currentMovieIndex]?.vote_average} / 10
          </span>
        </div>
        <div
          className="-m-4 -mb-72 mt-16 gap-4 bg-black/60 p-4 sm:w-1/2 lg:hidden flex flex-col rounded-2xl"
          style={{
            opacity: isImageVisible ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        >
          <p className="dark-shadow text-sm">
            {data && data[currentMovieIndex]
              ? truncateText(data[currentMovieIndex].overview, 120)
              : ''}
          </p>
          <Link
            href={`${data[currentMovieIndex]?.media_type === 'movie' ? `movie/${data[currentMovieIndex]?.id}/${formattedTitle}` : `tv/${data[currentMovieIndex]?.id}/${formattedTitle}`}`}
            className="h-8 bg-white px-4 text-base font-semibold inline-flex w-fit items-center justify-center rounded-md whitespace-nowrap text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            Explore
          </Link>
        </div>
        <Carousel
          opts={{
            align: 'end',
            direction: 'rtl',
            loop: true,
            duration: 40,
          }}
          className="mt-4 w-full"
          setApi={setApi}
        >
          <CarouselContent className="lg:visible invisible">
            {data.map((movie: any, index: number) => {
              const formattedTitle = (movie?.name || movie?.title || '')
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/\s+/g, '-');

              return (
                <CarouselItem
                  href={`${movie.media_type === 'movie' ? `movie/${movie?.id}/${formattedTitle}` : `tv/${movie?.id}/${formattedTitle}`}`}
                  key={index}
                  className="basis-1/3"
                >
                  <div
                    className={`${index === currentMovieIndex ? 'elevated mt-6 gap-2 p-1 flex flex-col items-center' : 'unelevated mt-6 gap-2 p-1 flex flex-col items-center'}`}
                  >
                    <Card className="h-96 border-white shadow-lg relative w-full overflow-hidden border-4 bg-cover bg-center">
                      <BackgroundImage
                        src={`https://image.tmdb.org/t/p/w342/${movie?.poster_path}`}
                        alt={`Poster image for ${movie?.title}`}
                        lazy="eager"
                      />
                    </Card>
                    {index == currentMovieIndex && (
                      <span className="dark-shadow text-center wrap-break-word">
                        {!movie?.title ? movie?.name : movie?.title}
                      </span>
                    )}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div onClick={handlePreviousClick}>
            <CarouselPrevious />
          </div>
          <div onClick={handleNextClick}>
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default Hero;
