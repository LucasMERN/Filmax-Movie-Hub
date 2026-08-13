import { getSingle } from '@/lib/api';
import Link from 'next/link';
import BackgroundImage from './ui/background-image';

interface CallToActionTypes {
  id: string;
  color: string;
  backgroundImageTopPosition?: string;
  mediaType: 'movie' | 'tv';
}

async function CallToAction({
  id,
  color,
  mediaType,
  className,
  backgroundImageTopPosition,
  ...props
}: CallToActionTypes & React.ComponentProps<'div'>) {
  try {
    const mediaData = await getSingle(mediaType, id);
    const formattedTitle = (mediaType === 'tv' ? mediaData?.name : mediaData?.title)
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');

    return (
      <>
        <section
          className={`${className} relative hidden w-full overflow-hidden py-24 text-white lg:block`}
          style={{
            background: `linear-gradient(to right, ${color} 30%, transparent 60%)`,
          }}
          {...props}
        >
          <BackgroundImage
            alt={`Backdrop image for ${mediaData?.title || mediaData?.name}`}
            src={`https://image.tmdb.org/t/p/original/${mediaData?.backdrop_path}`}
            quality={100}
            loading="lazy"
            className="-z-1 h-auto!"
            style={{ top: backgroundImageTopPosition ?? undefined }}
          />
          <div className="container">
            <div className="flex w-1/2 flex-col gap-8">
              <h3 className="text-2xl font-bold tracking-wider">
                {mediaType === 'tv' ? mediaData?.name : mediaData?.title}
              </h3>
              {mediaData?.genres && mediaData?.genres.length > 0 && (
                <div className="flex flex-row flex-wrap items-center">
                  <span className="text-lg font-medium">Category:</span>
                  {mediaData?.genres.map((genres: any, index: number) => (
                    <Link
                      prefetch={false}
                      key={index}
                      aria-label={`Click to go to the ${genres.name} category page`}
                      title={`Click to go to the ${genres.name} category page`}
                      href={`/categories/${genres.id}/${genres.name}`}
                      className={`${mediaData.genres.length - 1 === index ? '' : 'border-r-2'} px-2 leading-none hover:underline`}
                    >
                      {genres.name}
                    </Link>
                  ))}
                </div>
              )}
              {mediaData?.created_by && mediaData?.created_by.length > 0 && (
                <div className="flex flex-row items-center">
                  <span className="text-lg font-medium">Director:</span>
                  {mediaData?.created_by.map((director: any, index: number) => (
                    <Link
                      prefetch={false}
                      aria-label={`Click to go to the ${director.name} director page`}
                      title={`Click to go to the ${director.name} director page`}
                      href={`/person/${director.id}/${director.name}`}
                      key={index}
                      className="px-2 hover:underline"
                    >
                      {director.name}
                    </Link>
                  ))}
                </div>
              )}
              <div className="w-1/2">{mediaData?.overview}</div>
              <Link
                prefetch={false}
                aria-label={`Click to go to the ${mediaType === 'tv' ? mediaData?.name : mediaData?.title} page`}
                title={`Click to go to the ${mediaType === 'tv' ? mediaData?.name : mediaData?.title} page`}
                href={`${mediaType}/${id}/${formattedTitle}`}
                className="inline-flex h-8 w-fit items-center justify-center rounded-md bg-white px-4 text-base font-semibold whitespace-nowrap text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                Explore
              </Link>
            </div>
          </div>
        </section>
        <section
          className="relative w-full overflow-hidden py-24 text-white lg:hidden"
          style={{
            backgroundImage: `linear-gradient(to top, ${color} 45%, transparent 80%)`,
          }}
        >
          <BackgroundImage
            alt={`Backdrop image for ${mediaData?.title || mediaData?.name}`}
            src={`https://image.tmdb.org/t/p/original/${mediaData?.backdrop_path}`}
            quality={100}
            loading="lazy"
            className="-z-1 h-auto!"
            style={{ top: backgroundImageTopPosition ?? undefined }}
          />
          <div className="container">
            <div className="flex flex-col gap-8">
              <h3 className="dark-shadow text-2xl font-bold tracking-wider">
                {mediaType === 'tv' ? mediaData?.name : mediaData?.title}
              </h3>
              {mediaData?.genres && mediaData?.genres.length > 0 && (
                <div className="flex flex-row items-center">
                  <span className="dark-shadow text-lg font-medium">Category:</span>
                  {mediaData?.genres.map((genres: any, index: number) => (
                    <Link
                      prefetch={false}
                      key={index}
                      aria-label={`Click to go to the ${genres.name} category page`}
                      title={`Click to go to the ${genres.name} category page`}
                      href={`/categories/${genres.id}/${genres.name}`}
                      className={`${mediaData.genres.length - 1 === index ? '' : 'border-r-2'} px-2 leading-none hover:underline`}
                    >
                      {genres.name}
                    </Link>
                  ))}
                </div>
              )}
              {mediaData?.created_by && mediaData?.created_by.length > 0 && (
                <div className="flex flex-row items-center">
                  <span className="dark-shadow text-lg font-medium">Director:</span>
                  {mediaData?.created_by.map((director: any, index: number) => (
                    <span key={index} className="dark-shadow px-2">
                      {director.name}
                    </span>
                  ))}
                </div>
              )}
              <div className="dark-shadow">{mediaData?.overview}</div>
              <Link
                prefetch={false}
                aria-label={`Click to go to the ${mediaType === 'tv' ? mediaData?.name : mediaData?.title} page`}
                title={`Click to go to the ${mediaType === 'tv' ? mediaData?.name : mediaData?.title} page`}
                href={`${mediaType}/${id}/${formattedTitle}`}
                className="inline-flex h-8 w-fit items-center justify-center rounded-md bg-white px-4 text-base font-semibold whitespace-nowrap text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                Explore
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error('Error in Test component:', error);
    return <div>Error</div>;
  }
}

export default CallToAction;
