export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="absolute w-screen top-0">
        {children}
      </section>
    )
  }