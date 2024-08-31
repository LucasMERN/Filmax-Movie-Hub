import Image from "next/image";

type BackgroundImageProps = {
    src: string;
    alt: string;
}

const BackgroundImage = ({src, alt}: BackgroundImageProps) => (
      <Image
        alt={alt}
        src={src}
        quality={80}
        fill
        loading="lazy"
        sizes="100%"
        style={{
          objectFit: "cover",
        }}
      />
);

export default BackgroundImage;