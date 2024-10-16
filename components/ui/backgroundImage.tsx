import Image, { StaticImageData } from "next/image";

type BackgroundImageProps = {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  lazy?: "lazy" | "eager";
  priority?: boolean;
};

const BackgroundImage = ({
  src,
  alt,
  className,
  lazy = "lazy",
  priority = false,
}: BackgroundImageProps) => (
  <Image
    alt={alt}
    src={src}
    quality={80}
    fill
    loading={lazy}
    priority={priority}
    sizes="100%"
    style={{
      objectFit: "cover",
    }}
    className={className}
    unoptimized
  />
);

export default BackgroundImage;
