import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function Terms() {
  return (
    <section className="bg-white">
      <div className="container py-20 lg:px-80">
        <h1 className="mb-4 text-3xl font-bold">Terms of Service</h1>
        <h2 className="mb-12 text-xl font-bold">Last Updated: August 12, 2026</h2>
        <section>
          <ul className="flex flex-col gap-8">
            <li className="flex flex-col gap-4">
              <strong className="mt-4 text-lg">1. Acceptance of Terms</strong>
              <p>
                By accessing or using this website, you agree to comply with and be bound by these
                Terms of Service. If you do not agree to these terms, please do not use the
                application.
              </p>
            </li>
            <li className="flex flex-col gap-4">
              <strong className="mt-4 text-lg">2. Description of Service</strong>
              <p>
                Our platform is an informational media discovery application. It allows users to
                browse entertainment metadata and manage personal watchlists.
              </p>
              <ul className="flex flex-col gap-4 pl-8">
                <li>
                  We utilize public metadata streams provided via the official API of{' '}
                  <strong>The Movie Database (TMDB)</strong>.
                </li>
                <li>This application is not endorsed, certified, or sponsored by TMDB.</li>
                <li>
                  <strong>No Media Streaming:</strong> We do not host, store, or stream video
                  content, movies, television episodes, or anime. All data is for informational and
                  reference purposes only, mirroring public records found on TMDB or IMDb.
                </li>
              </ul>
            </li>
            <li className="flex flex-col gap-4">
              <strong className="mt-4 text-lg">3. User Accounts and Registration</strong>
              <p>
                To access custom watchlist tools, you must register and authenticate via our
                third-party identity management provider, <strong>Clerk</strong>.
              </p>
              <ul className="flex flex-col gap-4 pl-8">
                <li>
                  You agree to provide accurate and secure login details through Clerk's secure
                  interface.
                </li>
                <li>We do not collect or store your credentials, passwords, or emails.</li>
                <li>
                  We store only a randomized, anonymized string (your Clerk User ID) in our cloud
                  database layer (<strong>Supabase</strong>) to map your saved media items to your
                  session.
                </li>
              </ul>
            </li>
            <li className="flex flex-col gap-4">
              <strong className="mt-4 text-lg">4. Prohibited Conduct</strong>
              <p>You agree not to exploit or abuse the platform. Prohibited behavior includes:</p>
              <ul className="flex flex-col gap-4 pl-8">
                <li>
                  Attempting to bypass, reverse engineer, or disrupt the application's code, Clerk
                  authentication flows, or Supabase database calls.
                </li>
                <li>
                  Utilizing automated bots, scrapers, or spiders to scrape media data from this
                  site.
                </li>
                <li>
                  Attempting to upload malicious scripts, webhooks, or payloads to our Vercel
                  hosting deployment.
                </li>
              </ul>
            </li>
            <li className="flex flex-col gap-4">
              <strong className="mt-4 text-lg">5. Intellectual Property</strong>
              <p>
                All movie titles, synopses, posters, images, and trailers displayed on this site are
                the intellectual property of their respective copyright owners and TMDB. Our
                platform claims no ownership over this metadata. The application user interface
                design and codebase are the properties of the site administrator.
              </p>
            </li>
            <li className="flex flex-col gap-4">
              <strong className="mt-4 text-lg">
                6. Disclaimer of Warranties and Limitation of Liability
              </strong>
              <p>
                This service is provided on an "as-is" and "as-available" basis without warranties
                of any kind. Because we rely on external APIs (TMDB) and third-party cloud
                infrastructure (Clerk, Supabase, Vercel), we do not guarantee uninterrupted or
                error-free site operation. We are not liable for any data loss regarding your custom
                watchlists.
              </p>
            </li>
            <li className="flex flex-col gap-4">
              <strong className="mt-4 text-lg">7. Changes to Terms</strong>
              <p>
                We reserve the right to update these terms at any time. Continued use of the
                platform following updates constitutes absolute acceptance of the revised terms.
              </p>
            </li>
          </ul>
        </section>
        <Button asChild className="mx-auto mt-12 w-fit">
          <Link
            href="/dashboard"
            title="Click to return to the Dashboard page"
            aria-label="Click to return to the Dashboard page"
          >
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </section>
  );
}
