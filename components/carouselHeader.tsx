import Link from 'next/link';

interface CarouselHeaderTypes {
  title: string;
  link: string;
}

const CarouselHeader = ({ title, link }: CarouselHeaderTypes) => {
  return (
    <div className="-mb-4 gap-4 px-1 pr-8 text-white lg:pr-12 relative z-10 flex flex-row items-baseline">
      <h3 className="text-xl font-semibold">{title}</h3>
      <Link href={link} className="text-sm font-extralight cursor-pointer">
        View All
      </Link>
    </div>
  );
};

export default CarouselHeader;
