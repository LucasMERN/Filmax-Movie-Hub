"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/Components/ui/Button";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed z-10 w-full bg-gradient-to-b from-neutral-600 pb-8 pt-8">
      <div className="container mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0 ">
        <ul className="flex flex-row items-center gap-2 lg:gap-8">
          <li className="mr-4 w-6 md:w-12 lg:mr-12">
            <Link href="/">
              <Image
                src="/logo.svg"
                width={50}
                height={50}
                alt="Filmax Logo"
                priority={true}
                className="-mb-1"
              />
            </Link>
          </li>

          <li>
            <Link
              className={`link ${
                pathname === "/dashboard"
                  ? "underline decoration-2 underline-offset-4"
                  : ""
              } text-sm text-white md:text-lg`}
              href="/dashboard"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              className={`link ${
                pathname === "/dashboard/trending"
                  ? "underline decoration-2 underline-offset-4"
                  : ""
              } text-sm text-white md:text-lg`}
              href="/dashboard/trending"
            >
              Trending
            </Link>
          </li>

          <li>
            <Link
              className={`link ${
                pathname === "/dashboard/movies"
                  ? "underline decoration-2 underline-offset-4"
                  : ""
              } text-sm text-white md:text-lg`}
              href="/dashboard/movies"
            >
              Movies
            </Link>
          </li>

          <li>
            <Link
              className={`link ${
                pathname === "/dashboard/shows"
                  ? "underline decoration-2 underline-offset-4"
                  : ""
              } text-sm text-white md:text-lg`}
              href="/dashboard/shows"
            >
              Shows
            </Link>
          </li>

          <li>
            <Link
              className={`link ${
                pathname === "/dashboard/categories"
                  ? "underline decoration-2 underline-offset-4"
                  : ""
              } text-sm text-white md:text-lg`}
              href="/dashboard/categories"
            >
              Categories
            </Link>
          </li>
        </ul>

        <div className="hidden flex-row gap-4 md:flex">
          <Button type="submit" variant="default" size="sm">
            Premium
          </Button>
          <Button type="submit" variant="secondary" size="sm">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
}
