"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/Components/ui/Button";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="pt-8 pb-8 bg-gradient-to-b from-neutral-600 z-10 fixed w-full">
      <div className="container mx-auto flex flex-col gap-4 md:flex-row md:justify-between md:gap-0 md:items-center ">
        <ul className="flex flex-row items-center lg:gap-8 gap-2">
          <li className="lg:mr-12 mr-4 w-6 md:w-12">
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
              } text-white text-sm md:text-lg`}
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
              } text-white text-sm md:text-lg`}
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
              } text-white text-sm md:text-lg`}
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
              } text-white text-sm md:text-lg`}
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
              } text-white text-sm md:text-lg`}
              href="/dashboard/categories"
            >
              Categories
            </Link>
          </li>
        </ul>

        <div className="gap-4 flex-row hidden md:flex">
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
