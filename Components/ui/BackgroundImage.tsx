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
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
        className="!static"
      />
);

export default BackgroundImage;