"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import Logo from '@/public/logo.svg';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed z-50 w-full bg-gradient-to-b from-black pb-20 pt-8">
      <div className="container mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0 ">
        <Sheet>
          <SheetTrigger asChild>
            <button className="block w-fit md:hidden">
              <Menu size={30} color="white" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col justify-between h-full">
            <SheetHeader>
              <SheetTitle>FILMAX CINEMA HUB</SheetTitle>
              <SheetDescription>
                Pick from our route selection to navigate the site!
              </SheetDescription>
            </SheetHeader>
            <ul className="-mt-32 flex flex-col gap-6">
              <li>
                <Link
                  className={`link ${
                    pathname === "/dashboard" ? "text-white" : "text-white/40"
                  } tracking-widest`}
                  href="/dashboard"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  className={`link ${
                    pathname === "/trending" ? "text-white" : "text-white/40"
                  } tracking-widest`}
                  href="/trending"
                >
                  Trending
                </Link>
              </li>

              <li>
                <Link
                  className={`link ${
                    pathname === "/movies" ? "text-white" : "text-white/40"
                  } tracking-widest`}
                  href="/movies"
                >
                  Movies
                </Link>
              </li>

              <li>
                <Link
                  className={`link ${
                    pathname === "/shows" ? "text-white" : "text-white/40"
                  } tracking-widest`}
                  href="/shows"
                >
                  Shows
                </Link>
              </li>

              <li>
                <Link
                  className={`link ${
                    pathname === "/categories" ? "text-white" : "text-white/40"
                  } tracking-widest`}
                  href="/categories"
                >
                  Categories
                </Link>
              </li>
            </ul>
            <SheetFooter>
              <Image src={Logo} 
                width={50}
                height={50}
                alt="Filmax Logo" />
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <ul className="hidden flex-row items-center gap-6 md:flex">
          <li className="mr-4 hidden md:block">
            <Link href="/" className="block h-12 w-12">
              <Image
                src={Logo}
                width={50}
                height={50}
                alt="Filmax Logo"
                priority
                className="mt-2"
              />
            </Link>
          </li>

          <li>
            <Link
              className={`link ${
                pathname === "/dashboard" ? "text-white" : "text-white/40"
              } text-sm tracking-widest hover:text-white`}
              href="/dashboard"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              className={`link ${
                pathname === "/trending" ? "text-white" : "text-white/40"
              } text-sm tracking-widest hover:text-white`}
              href="/trending"
            >
              Trending
            </Link>
          </li>

          <li>
            <Link
              className={`link ${
                pathname === "/movies" ? "text-white" : "text-white/40"
              } text-sm tracking-widest hover:text-white`}
              href="/movies"
            >
              Movies
            </Link>
          </li>

          <li>
            <Link
              className={`link ${
                pathname === "/shows" ? "text-white" : "text-white/40"
              } text-sm tracking-widest hover:text-white`}
              href="/shows"
            >
              Shows
            </Link>
          </li>

          <li>
            <Link
              className={`link ${
                pathname === "/categories" ? "text-white" : "text-white/40"
              } text-sm tracking-widest hover:text-white`}
              href="/categories"
            >
              Categories
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
