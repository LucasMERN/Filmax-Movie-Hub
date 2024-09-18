import PersonPage from "@/Pages/PersonPage";

export default function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  return <PersonPage id={id} />;
}
