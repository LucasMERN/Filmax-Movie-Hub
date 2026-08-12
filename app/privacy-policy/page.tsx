import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function Privacy() {
  return (
    <section className="bg-white">
      <div className="container py-20 lg:px-80">
        <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>
        <h2 className="mb-4 text-xl font-bold">Last Updated: August 12, 2026</h2>
        <p className="mb-12">
          Welcome to our website. We respect your privacy and are committed to protecting any
          minimal information necessary to provide our application services. This Privacy Policy
          explains our data handling workflows, confirming our alignment with strict privacy
          frameworks and absolute data minimization.
        </p>
        <section>
          <ul className="flex flex-col gap-8">
            <li className="flex flex-col gap-4">
              <strong className="mt-4 text-lg">1. Data Collection and Minimization</strong>
              <p>
                We operate under a strict principle of data minimization. We do not host internal
                databases that collect or store your personal identity data:
              </p>
              <ul className="flex flex-col gap-4 pl-8">
                <li>
                  <strong>No Personal Information:</strong> We do not request, process, handle, or
                  store usernames, passwords, names, emails, billing details, or physical addresses.
                </li>
                <li>
                  <strong>No Internal Forms:</strong> We do not provide user-facing data collection
                  sheets, marketing opt-ins, downloadable payloads, or advertising modules.
                </li>
              </ul>
            </li>
            <li className="flex flex-col gap-4">
              <strong className="mt-4 text-lg">2. Authentication Services (Clerk)</strong>
              <p>
                To access custom watchlist tools, users register and log in via our integrated
                third-party identity management software, Clerk Inc..
              </p>
              <ul className="flex flex-col gap-4 pl-8">
                <li>
                  All credentials, security handshakes, session token allocations, and underlying
                  private data profiles are processed entirely on secure endpoints managed by Clerk.
                </li>
                <li>
                  Our web ecosystem does not inspect, capture, or intercept user passwords or emails
                  during the authentication lifecycle.
                </li>
              </ul>
            </li>
            <li className="flex flex-col gap-4">
              <strong className="mt-4 text-lg">
                3. Application State and Watchlists (Supabase)
              </strong>
              <p>
                To preserve custom list features across active login sessions, we utilize an
                encrypted cloud database layer operated by Supabase.
              </p>
              <ul className="flex flex-col gap-4 pl-8">
                <li>
                  <strong>Stored Datasets:</strong> When a user logs in via Clerk, our system
                  monitors account creation via automated secure backend hooks. We extract only a
                  randomized, anonymized unique identification string (the Clerk User ID) and append
                  it to internal tables.
                </li>
                <li>
                  <strong>Watchlist Items:</strong> This user identification code maps exclusively
                  to the database record holding the ID tags of media elements you save (movies, TV
                  shows, and anime). It does not hold real-world connections to your true identity
                  or contact methods.
                </li>
              </ul>
            </li>
            <li className="flex flex-col gap-4">
              <strong className="mt-4 text-lg">
                4. Third-Party Content API Integration (TMDB)
              </strong>
              <p>
                Our platform serves as an informative presentation interface utilizing public
                metadata streams provided via the official API of The Movie Database (TMDB).
              </p>
              <ul className="flex flex-col gap-4 pl-8">
                <li>
                  <strong>Informational Purpose Only:</strong> This application displays purely
                  reference-based data, synthetic synopses, and graphics sourced via official
                  pipelines.
                </li>
                <li>
                  <strong>Disclaimer:</strong> This site is not endorsed, certified, or sponsored by
                  TMDB.
                </li>
                <li>
                  <strong>Media Streams:</strong> We do not host, store, cache, distribute, or
                  stream actual movie files, television media, or intellectual properties on our
                  servers. All interactive media features map to standard actions available via
                  public public-facing records like TMDB or IMDb.
                </li>
              </ul>
            </li>
            <li className="flex flex-col gap-4">
              <strong className="mt-4 text-lg">5. Tracking and Cookies</strong>
              <p>
                We do not leverage diagnostic advertisement tracking cookies or native programmatic
                trackers. Session tokens generated during sign-in are managed independently by Clerk
                to ensure functional access to watchlist state variables.
              </p>
            </li>
            <li className="flex flex-col gap-4">
              <strong className="mt-4 text-lg">6. Contact Us</strong>
              <p>
                For explicit technical tracking inquiries or policy clearance validations, please
                contact the site administrator via our project repository or deployment dashboard
                coordinates.
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
