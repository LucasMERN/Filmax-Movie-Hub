export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="absolute w-full top-0">{children}</section>;
}
