'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import Button from '@/Components/ui/Button'
 
export default function Nav() {
  const pathname = usePathname()
 
  return (
    <nav className='p-8 pb-20 bg-gradient-to-b from-neutral-600 z-10 fixed w-full'>
        <div className='container mx-auto flex-row flex justify-between items-center'>
            <ul className='flex flex-row items-center gap-8'>
                <li className='mr-12'>
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            width={50}
                            height={50}
                            alt="Filmax Logo"
                            priority={true}
                            className='-mb-3'
                        />
                    </Link>
                </li>

                <li>
                    <Link className={`link ${pathname === '/dashboard' ? 'underline decoration-2 underline-offset-4' : ''} text-white`} href="/dashboard">
                        Home
                    </Link>
                </li>

                <li>
                    <Link
                        className={`link ${pathname === '/dashboard/trending' ? 'underline decoration-2 underline-offset-4' : ''} text-white`}
                        href="/dashboard/trending"
                    >
                        trending
                    </Link>
                </li>

                <li>
                    <Link
                        className={`link ${pathname === '/dashboard/movies' ? 'underline decoration-2 underline-offset-4' : ''} text-white`}
                        href="/dashboard/movies"
                    >
                        movies
                    </Link>
                </li>

                <li>
                    <Link
                        className={`link ${pathname === '/dashboard/shows' ? 'underline decoration-2 underline-offset-4' : ''} text-white`}
                        href="/dashboard/shows"
                    >
                        shows
                    </Link>
                </li>

                <li>
                    <Link
                        className={`link ${pathname === '/dashboard/categories' ? 'underline decoration-2 underline-offset-4' : ''} text-white`}
                        href="/dashboard/categories"
                    >
                        Categories
                    </Link>
                </li>
            </ul>

            <div className='flex gap-4 flex-row'>
                <Button type="submit" intent="primary" size="medium">Premium</Button>
                <Button type="submit" intent="secondary" size="medium">Sign Up</Button>
            </div>
        </div>
        
    </nav>
  )
}