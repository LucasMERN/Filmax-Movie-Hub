'use client';

import React, { useState, useEffect } from 'react';
import BackgroundImage from '@/components/ui/background-image';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Movie } from '@/types/api';

const LandingPromo = ({ color, promoMovies }: { color: string; promoMovies: Movie[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isImageVisible, setIsImageVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsImageVisible(false);
      setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
        setIsImageVisible(true);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const carousel = [
    {
      id: 0,
      headline: "SEE WHAT'S NEXT",
      tagline: ['WATCH ANYTIME.', 'FROM ANYWHERE.'],
      stuff: 'border-l-neutral-700',
      activeImage: 0,
    },
    {
      id: 1,
      headline: 'WATCH FROM ANYWHERE',
      tagline: ['SMART TVS, PLAYSTATION.', 'XBOX, APPLE TV, AND MORE.'],
      stuff: 'neutral-700',
      activeImage: 1,
    },
    {
      id: 2,
      headline: 'GET STARTED',
      tagline: ['YOU WANT IT?', 'WE GOT IT!'],
      stuff: 'neutral-700',
      activeImage: 2,
    },
  ];

  return (
    <div className="relative h-112.5 w-full overflow-hidden lg:h-175">
      <Image
        alt={`Backdrop image for ${promoMovies[carousel[activeIndex].activeImage]?.title}`}
        decoding="async"
        className="absolute inset-0 z-10 h-full w-full object-cover grayscale"
        fill
        priority
        loading="eager"
        unoptimized
        src={`https://image.tmdb.org/t/p/original/${promoMovies[carousel[activeIndex].activeImage]?.backdrop_path}`}
        style={{
          opacity: isImageVisible ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
        }}
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(-145deg, ${color} 50%, transparent 50.1%)`,
        }}
      ></div>
      <div className="relative z-20 container mx-auto flex h-full flex-col justify-between py-20 transition-opacity duration-1000 ease-in-out md:pl-32 lg:py-28 xl:py-36 xl:pl-64">
        <h3
          className="text-3xl font-extrabold tracking-widest text-white/70 lg:text-6xl"
          style={{
            translate: isImageVisible ? '0%' : '0% -200%',
            opacity: isImageVisible ? 1 : 0,
            transition: 'all .5s ease-in-out',
          }}
        >
          {carousel[activeIndex].headline}
        </h3>
        <div className="flex flex-col">
          {carousel[activeIndex].tagline.map((line, index) => (
            <h4
              key={index}
              className="text-xl font-bold text-white"
              style={{
                translate: isImageVisible ? '0%' : '0% -200%',
                opacity: isImageVisible ? 1 : 0,
                transition: 'all .5s ease-in-out',
              }}
            >
              {line} <br />
            </h4>
          ))}
          <Button variant="secondary" className="mt-4 mb-4 w-fit font-medium! lg:mt-8" asChild>
            <Link href="/dashboard">ENTER SITE</Link>
          </Button>
        </div>
      </div>
      <div className="absolute top-24 -right-24 z-11 md:right-12 lg:top-36 lg:right-36">
        <div
          className="relative h-52 w-96 overflow-hidden lg:h-108 lg:w-200"
          style={{
            translate: isImageVisible ? '0%' : '50% 0%',
            opacity: isImageVisible ? 1 : 0,
            transition: 'all .5s ease-in-out',
          }}
        >
          <BackgroundImage
            src={`https://image.tmdb.org/t/p/original/${promoMovies[carousel[activeIndex].activeImage]?.backdrop_path}`}
            alt={`Poster image for ${promoMovies[carousel[activeIndex].activeImage]?.title}`}
            lazy="eager"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPromo;
