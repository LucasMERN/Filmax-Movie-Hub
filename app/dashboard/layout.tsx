export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="w-full">{children}</section>;
}
