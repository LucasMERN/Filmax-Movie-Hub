import { Skeleton } from "@/components/ui/skeleton";

export default function CallToActionSkelton() {
  const data = Array(3).fill(null);
  const director = Array(2).fill(null);

  return (
    <>
      <section
        className="w-full py-24 text-white lg:block"
        style={{
          backgroundImage: `linear-gradient(to right, #007D4D 30%, transparent 60%)`,
          backgroundPosition: "0% 10%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="flex w-1/2 flex-col gap-8">
            <Skeleton className="text-2xl font-bold tracking-wider" />
            <div className="flex flex-row flex-wrap items-center">
              <span className="text-lg font-medium">Category:</span>
              {data.map((genres: any, index: number) => (
                <Skeleton key={index} className={`mx-1 h-6 w-12`} />
              ))}
            </div>
            <div className="flex flex-row items-center">
              <span className="text-lg font-medium">Director:</span>
              {director.map((director: any, index: number) => (
                <Skeleton key={index} className={`mx-1 h-6 w-12`} />
              ))}
            </div>
            <div className="flex w-1/2 flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="hover:bg-secondary/80 inline-flex h-8 w-24 items-center justify-center whitespace-nowrap rounded-md bg-white px-4 text-base font-semibold text-secondary-foreground transition-colors" />
          </div>
        </div>
      </section>
    </>
  );
}
