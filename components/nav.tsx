'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, SignOutButton, UserButton } from '@clerk/nextjs';
import AuthButton from '@/components/auth-button';

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed z-50 w-full pt-8 pb-8 md:pb-12"
      style={{
        background:
          'linear-gradient(180deg, rgba(0, 0, 0, 1) 10%, rgb(0 0 0 / 76%) 54%, rgb(0 0 0 / 38%) 86%, rgba(255, 255, 255, 0) 100%)',
      }}
    >
      <div className="container mx-auto flex flex-row items-center justify-between gap-4 md:gap-0">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden bg-transparent hover:text-primary hover:border-primary hover:bg-transparent">
              <Menu size={30} className="text-white group-hover/button:text-primary" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex h-full flex-col justify-between bg-[rgb(22,22,22)]">
            <SheetHeader>
              <SheetTitle>FILMAX CINEMA HUB</SheetTitle>
              <SheetDescription>
                Pick from our route selection to navigate the site!
              </SheetDescription>
            </SheetHeader>
            <ul className="flex flex-col gap-6">
              <li>
                <Link
                  className={`link ${
                    pathname === '/dashboard' ? 'text-white' : 'text-white/40'
                    } text-sm tracking-widest hover:text-white`}
                  href="/dashboard"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  className={`link ${
                    pathname === '/trending' ? 'text-white' : 'text-white/40'
                    } text-sm tracking-widest hover:text-white`}
                  href="/trending"
                >
                  Trending
                </Link>
              </li>

              <li>
                <Link
                  className={`link ${
                    pathname === '/categories' ? 'text-white' : 'text-white/40'
                    } text-sm tracking-widest hover:text-white`}
                  href="/categories"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  className={`link ${
                    pathname === '/movies' ? 'text-white' : 'text-white/40'
                    } text-sm tracking-widest hover:text-white`}
                  href="/movies"
                >
                  Movies
                </Link>
              </li>

              <li>
                <Link
                  className={`link ${
                    pathname === '/shows' ? 'text-white' : 'text-white/40'
                    } text-sm tracking-widest hover:text-white`}
                  href="/shows"
                >
                  Shows
                </Link>
              </li>
              <SignedIn>
                <li>
                  <Link
                    className={`link ${
                      pathname === '/watchlist' ? 'text-white' : 'text-white/40'
                    } text-sm tracking-widest hover:text-white`}
                    href="/watchlist"
                  >
                    Watchlist
                  </Link>
                </li>
              </SignedIn>
            </ul>
            <SheetFooter>
              <Image
                src="/logo.svg"
                width={50}
                height={50}
                alt="Filmax Logo"
                loading="eager"
                unoptimized
              />
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <div className="md:hidden">
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-9 h-9 border-2 border-primary',
                },
              }}
            />
          </SignedIn>

          <SignedOut>
            <AuthButton />
          </SignedOut>
        </div>

        <ul className="hidden flex-row items-center gap-6 md:flex">
          <li className="mr-4 hidden h-12 w-12 md:block">
            <Link href="/dashboard">
              <Image
                src="/logo.svg"
                width={50}
                height={50}
                alt="Filmax Logo"
                priority
                className="mt-2"
                loading="eager"
                unoptimized
              />
            </Link>
          </li>

          <li>
            <Link
              className={`link ${
                pathname === '/dashboard' ? 'text-white' : 'text-white/40'
              } text-sm tracking-widest hover:text-white`}
              href="/dashboard"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              className={`link ${
                pathname === '/trending' ? 'text-white' : 'text-white/40'
              } text-sm tracking-widest hover:text-white`}
              href="/trending"
            >
              Trending
            </Link>
          </li>

          <li>
            <Link
              className={`link ${
                pathname === '/categories' ? 'text-white' : 'text-white/40'
              } text-sm tracking-widest hover:text-white`}
              href="/categories"
            >
              Categories
            </Link>
          </li>

          <li>
            <Link
              className={`link ${
                pathname === '/movies' ? 'text-white' : 'text-white/40'
              } text-sm tracking-widest hover:text-white`}
              href="/movies"
            >
              Movies
            </Link>
          </li>

          <li>
            <Link
              className={`link ${
                pathname === '/shows' ? 'text-white' : 'text-white/40'
              } text-sm tracking-widest hover:text-white`}
              href="/shows"
            >
              Shows
            </Link>
          </li>

          <SignedIn>
            <li>
              <Link
                className={`link ${
                  pathname === '/watchlist' ? 'text-white' : 'text-white/40'
                } text-sm tracking-widest hover:text-white`}
                href="/watchlist"
              >
                Watchlist
              </Link>
            </li>
          </SignedIn>
        </ul>
        <div className="hidden md:block">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
