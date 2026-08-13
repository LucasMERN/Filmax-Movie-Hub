import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import BackgroundImage from '@/components/ui/background-image';
import React from 'react';

interface CarouselProps {
  data: any;
  width?: string;
  loop?: boolean;
  mediaType?: 'tv' | 'person' | 'movie';
}

const ProductCarousel: React.FC<CarouselProps> = ({
  data,
  width = 'basis-1/6',
  mediaType,
  loop = true,
}) => {
  return (
    <Carousel
      opts={{
        align: 'start',
        direction: 'ltr',
        skipSnaps: true,
        loop: loop,
      }}
      className="w-full"
      orientation="horizontal"
    >
      <CarouselContent className="w-11/12">
        {data !== null &&
          data?.adult !== true &&
          data?.softcore !== true &&
          data.map((content: any, index: number) => {
            const formattedTitle = (content?.name || content?.title || '')
              .toLowerCase()
              .replace(/[^\w\s]/gi, '')
              .replace(/\s+/g, '-');

            return (
              <React.Fragment key={index}>
                {content?.profile_path !== null && content?.poster_path !== null && (
                  <CarouselItem
                    aria-label={`Click to go to the ${mediaType === 'tv' ? content?.name : content?.title} page`}
                    title={`Click to go to the ${mediaType === 'tv' ? content?.name : content?.title} page`}
                    href={`/${mediaType || content?.media_type}/${content?.id}/${formattedTitle}`}
                    key={content?.id}
                    className={`group mt-6 ${width} h-fit`}
                  >
                    <div className="flex flex-col items-center gap-2 p-1">
                      <Card className="relative h-96 w-full overflow-hidden bg-cover bg-center shadow-lg">
                        <BackgroundImage
                          src={`https://image.tmdb.org/t/p/w342/${(mediaType || content?.media_type) == 'person' ? content?.profile_path : content?.poster_path}`}
                          alt={
                            content?.title !== undefined
                              ? 'Poster image for' + content?.title
                              : 'Poster image for' + content?.name
                          }
                          sizes="25vw"
                          quality={50}
                          loading="lazy"
                          className="transition-transform group-hover:scale-105"
                        />
                      </Card>
                      <span className="text-center wrap-break-word text-white">
                        {content?.title || content?.name}
                      </span>
                    </div>
                  </CarouselItem>
                )}
              </React.Fragment>
            );
          })}
      </CarouselContent>
    </Carousel>
  );
};

export default ProductCarousel;
