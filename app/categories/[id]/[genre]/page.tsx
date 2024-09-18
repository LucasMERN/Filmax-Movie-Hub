import CategoryPage from "@/Pages/CategoryPage";

export default function Page({
  params,
}: {
  params: { id: string; genre: string };
}) {
  const { id, genre } = params;
  return <CategoryPage title={genre} genreID={id} />;
}
