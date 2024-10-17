"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import Logo from "@/public/logo.svg";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed z-50 w-full pb-8 pt-8 md:pb-12"
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,1) 10%, rgba(0,0,0,0.8071603641456583) 55%, rgba(252,176,69,0) 100%)",
      }}
    >
      <div className="container mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0 ">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu size={30} color="white" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex h-full flex-col justify-between"
          >
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
                    pathname === "/categories" ? "text-white" : "text-white/40"
                  } tracking-widest`}
                  href="/categories"
                >
                  Categories
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
            </ul>
            <SheetFooter>
              <Image
                src={Logo}
                width={50}
                height={50}
                alt="Filmax Logo"
                loading="eager"
              />
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <ul className="hidden flex-row items-center gap-6 md:flex">
          <li className="mr-4 hidden h-12 w-12 md:block">
            <Image
              src={Logo}
              width={50}
              height={50}
              alt="Filmax Logo"
              priority
              className="mt-2"
              loading="eager"
            />
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
                pathname === "/categories" ? "text-white" : "text-white/40"
              } text-sm tracking-widest hover:text-white`}
              href="/categories"
            >
              Categories
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
        </ul>
      </div>
    </nav>
  );
}
