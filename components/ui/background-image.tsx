import Image, { ImageProps } from 'next/image';

const BackgroundImage = ({ src, alt, className, ...props }: ImageProps) => (
  <Image
    alt={alt}
    src={src}
    quality={props.quality ? props.quality : 100}
    {...props}
    fill
    priority={props.loading === 'eager' ? true : false}
    sizes={props.sizes ? props.sizes : '100vw'}
    fetchPriority="high"
    className={`${className} object-cover!`}
  />
);

export default BackgroundImage;
