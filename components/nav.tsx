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
import AuthButton from '@/components/authButton';

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      className="pb-8 pt-8 md:pb-12 fixed z-50 w-full"
      style={{
        background:
          'linear-gradient(180deg, rgba(0, 0, 0, 1) 10%, rgb(0 0 0 / 76%) 54%, rgb(0 0 0 / 38%) 86%, rgba(255, 255, 255, 0) 100%)',
      }}
    >
      <div className="gap-4 md:gap-0 container mx-auto flex flex-row items-center justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu size={30} color="white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex h-full flex-col justify-between">
            <SheetHeader>
              <SheetTitle>FILMAX CINEMA HUB</SheetTitle>
              <SheetDescription>
                Pick from our route selection to navigate the site!
              </SheetDescription>
            </SheetHeader>
            <ul className="gap-6 flex flex-col">
              <li>
                <Link
                  className={`link ${
                    pathname === '/dashboard' ? 'text-white' : 'text-white/40'
                  } tracking-widest`}
                  href="/dashboard"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  className={`link ${
                    pathname === '/trending' ? 'text-white' : 'text-white/40'
                  } tracking-widest`}
                  href="/trending"
                >
                  Trending
                </Link>
              </li>

              <li>
                <Link
                  className={`link ${
                    pathname === '/categories' ? 'text-white' : 'text-white/40'
                  } tracking-widest`}
                  href="/categories"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  className={`link ${
                    pathname === '/movies' ? 'text-white' : 'text-white/40'
                  } tracking-widest`}
                  href="/movies"
                >
                  Movies
                </Link>
              </li>

              <li>
                <Link
                  className={`link ${
                    pathname === '/shows' ? 'text-white' : 'text-white/40'
                  } tracking-widest`}
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

        <ul className="gap-6 md:flex hidden flex-row items-center">
          <li className="mr-4 h-12 w-12 md:block hidden">
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
        <div className="md:block hidden">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
