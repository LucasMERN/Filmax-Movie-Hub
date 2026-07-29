import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { ClerkProvider } from '@clerk/nextjs';
import BackToTopButton from '@/components/back-to-top';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Filmax Cinema Hub',
  description: 'Welcome to Filmax Cinema Hub! Browse Movies and TV Shows and find your next watch!',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        </head>
        <body className={`${inter.className} bg-[rgb(22,22,22)]`}>
          <BackToTopButton />
          {children}
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
