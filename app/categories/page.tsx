import actionVideo from '@/videos/action.mp4';
import animatedVideo from '@/videos/animated.mp4';
import comedyVideo from '@/videos/comedy.mp4';
import crimeVideo from '@/videos/crime.mp4';
import horrorVideo from '@/videos/horror.mp4';
import scifiVideo from '@/videos/sci-fi.mp4';
import thrillerVideo from '@/videos/thriller.mp4';
import dramaVideo from '@/videos/drama.mp4';
import actionThumb from '@/assets/action.jpg';
import animatedThumb from '@/assets/animated.jpg';
import comedyThumb from '@/assets/comedy.jpg';
import crimeThumb from '@/assets/crime.jpg';
import horrorThumb from '@/assets/horror.jpg';
import scifiThumb from '@/assets/scifi.jpg';
import dramaThumb from '@/assets/drama.jpg';
import thrillerThumb from '@/assets/thriller.jpg';
import VideoTiles from '@/components/video-tiles';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import VideoTilesSkeleton from '@/components/skeletons/video-tiles-skeleton';
import { baseUrl } from '@/lib/base-url';

export const metadata: Metadata = {
  title: 'Filmax | Categories',
  description: 'Filmax Categories Page for choosing movie categories',
};

export default function Categories() {
  const videos = [
    {
      src: actionVideo,
      poster: actionThumb.src,
      blurData: actionThumb.blurDataURL,
      margin: '',
      alignment: '',
      title: 'Action',
      url: '/categories/28%2C12/action',
    },
    {
      src: animatedVideo,
      poster: animatedThumb.src,
      blurData: animatedThumb.blurDataURL,
      margin: 'md:mt-12',
      alignment: 'md:-mt-12',
      title: 'Animated',
      url: '/categories/16/animated',
    },
    {
      src: scifiVideo,
      poster: scifiThumb.src,
      blurData: scifiThumb.blurDataURL,
      margin: 'md:mt-24',
      alignment: 'md:-mt-24',
      title: 'Fantasy',
      url: '/categories/14%2C878/fantasy',
    },
    {
      src: thrillerVideo,
      poster: thrillerThumb.src,
      blurData: thrillerThumb.blurDataURL,
      margin: 'md:mt-8',
      alignment: 'md:-mt-8',
      title: 'Thriller',
      url: '/categories/53/thriller',
    },
    {
      src: dramaVideo,
      poster: dramaThumb.src,
      blurData: dramaThumb.blurDataURL,
      margin: 'md:-mt-4',
      alignment: 'md:mt-4',
      title: 'Drama',
      url: '/categories/18/drama',
    },
    {
      src: crimeVideo,
      poster: crimeThumb.src,
      blurData: crimeThumb.blurDataURL,
      margin: 'md:mt-24',
      alignment: 'md:-mt-24',
      title: 'Crime',
      url: '/categories/80/crime',
    },
    {
      src: comedyVideo,
      poster: comedyThumb.src,
      blurData: comedyThumb.blurDataURL,
      margin: 'md:mt-12',
      alignment: 'md:-mt-12',
      title: 'Comedy',
      url: '/categories/35/comedy',
    },
    {
      src: horrorVideo,
      poster: horrorThumb.src,
      blurData: horrorThumb.blurDataURL,
      margin: '',
      alignment: '',
      title: 'Horror',
      url: '/categories/27/horror',
    },
  ];
  const canonical = `${baseUrl}/categories`;

  return (
    <>
      <head>
        <link rel="canonical" href={canonical} />
      </head>
      <Suspense fallback={<VideoTilesSkeleton />}>
        <VideoTiles data={videos} />
      </Suspense>
    </>
  );
}
