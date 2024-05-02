import GraphQLProvider from '@/lib/provider';

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="absolute w-screen top-0">
        <GraphQLProvider>{children}</GraphQLProvider>
      </section>
    )
  }