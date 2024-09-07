import Link from "next/link";

interface CarouselHeaderTypes {
  title: string;
}

const CarouselHeader = ({ title }: CarouselHeaderTypes) => {
  return (
    <div className="relative z-10 -mb-4 flex flex-row items-baseline gap-4 px-1 pr-8 text-white lg:pr-12">
      <h3 className="text-xl font-semibold">{title}</h3>
      <Link href="#" className="cursor-pointer text-sm font-extralight">
        View All
      </Link>
    </div>
  );
};

export default CarouselHeader;
