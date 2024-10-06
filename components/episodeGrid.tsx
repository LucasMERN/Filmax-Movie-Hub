import EpisodeSelect from "@/components/episodeSelect";
import { TV } from "@/types/api";

const EpisodeGrid = async ({
  mediaData,
  id,
}: {
  mediaData: TV;
  id: number;
}) => {
  try {
    if (!mediaData) return <div>No data available</div>;

    return (
      <section className="container flex flex-col gap-4 pt-8">
        <h3 className="text-2xl font-semibold tracking-widest text-white">
          Episodes
        </h3>
        <EpisodeSelect mediaData={mediaData} id={id} />
      </section>
    );
  } catch (error) {
    console.error("Error fetching media data:", error);
    return <div>Error fetching data</div>;
  }
};

export default EpisodeGrid;
