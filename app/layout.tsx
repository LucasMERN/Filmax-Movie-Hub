import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import Loading from "./loading";
import BackToTopButton from "@/components/backToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.className} bg-background`}>
        <Suspense fallback={<Loading />}>
          <BackToTopButton />
          {children}
          <SpeedInsights />
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
