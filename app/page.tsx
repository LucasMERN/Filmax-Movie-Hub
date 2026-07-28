import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import LandingPromo from '@/components/landingPromo';
import download from '@/assets/landingdownload.jpg';
import watch from '@/assets/landingwatch.png';
import watchGIF from '@/assets/watchGIF.gif';
import stranger from '@/assets/stranger.png';
import loader from '@/assets/loader.gif';
import Footer from '@/components/footer';
import type { Metadata } from 'next';
import AuthButton from '@/components/authButton';

export const metadata: Metadata = {
  title: 'Welcome to Filmax Cinema Hub',
  description: 'Landing page for Filmax Cinema Hub',
};

export default async function Home() {
  return (
    <main className="bg-black min-h-screen">
      <nav className="from-black pb-8 pt-8 absolute z-20 w-full bg-linear-to-b">
        <div className="container mx-auto flex justify-between">
          <Link href="/">
            <Image
              src="/logo.svg"
              width={50}
              alt="Filmax Logo"
              priority={true}
              className="-mt-1"
              loading="eager"
              unoptimized
            />
          </Link>
          <AuthButton />
        </div>
      </nav>
      <section
        className="lg:h-[650px] relative h-[450px] w-full overflow-hidden border-b-4 border-primary"
        style={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.00) 43.75%, rgba(0, 0, 0, 0.80) 100%), url('/homehero.png') lightgray 50% / cover no-repeat`,
        }}
      >
        <div className="gap-4 pt-36 lg:pt-52 relative z-10 flex flex-col items-center text-center">
          <h1 className="dark-shadow text-2xl font-bold tracking-wider text-white lg:text-6xl lg:font-extrabold">
            Unlimited movies, all the <br />
            TV shows and more.
          </h1>
          <h2 className="dark-shadow font-medium text-white lg:text-2xl">
            FILMAX has you covered!
          </h2>
          <p className="dark-shadow -mb-2 text-sm font-light text-white lg:text-base">
            Ready to find your next binge?
          </p>
          <Button asChild>
            <Link href="/dashboard">
              Enter Site
              <ChevronRight className="-mr-1 pl-1" size={22} strokeWidth={3} />
            </Link>
          </Button>
        </div>
        <div
          className="bottom-0 h-24 absolute z-20 w-full"
          style={{
            background: 'linear-gradient(to top, black 0%, transparent 100%)',
          }}
        ></div>
      </section>
      <section className="gap-10 py-24 lg:flex-row container flex flex-col items-center justify-center">
        <div className="relative">
          <Image src={download} alt="" width={500} className="-mt-16" loading="eager" unoptimized />
          <div className="bottom-4 absolute flex w-full justify-center">
            <div className="bg-black p-2 shadow-lg lg:p-4 flex items-center justify-between rounded-xl border border-primary">
              <Image src={stranger} alt="" className="w-11 lg:w-14" loading="eager" unoptimized />
              <div className="pl-4 pr-14 flex flex-col">
                <h4 className="font-bold text-white whitespace-nowrap">Stranger Things</h4>
                <span className="text-[#0071EB]">Downloading...</span>
              </div>
              <Image
                src={loader}
                alt="loading animation"
                className="h-11 w-11 aspect-square"
                unoptimized
              />
            </div>
          </div>
        </div>
        <div className="gap-5 text-white flex flex-col">
          <h3 className="text-2xl font-bold lg:text-5xl">
            Download your shows
            <br /> to watch offline.
          </h3>
          <p className="lg:text-2xl">
            Save your favorites easily and always have
            <br /> something to watch.
          </p>
        </div>
      </section>
      <div className="w-full border-t-4 border-primary"></div>
      <section className="gap-10 py-24 lg:flex-row container flex flex-col items-center justify-center">
        <div className="gap-5 text-white flex flex-col">
          <h3 className="text-2xl font-bold lg:text-5xl">Watch Everywhere.</h3>
          <p className="lg:text-2xl">
            Stream unlimited movies and TV shows on <br /> your phone, tablet, laptop, and TV
            without <br /> paying more.
          </p>
        </div>
        <div className="relative">
          <Image
            src={watch}
            alt="various devices for watching movies"
            width={300}
            className="md:w-[500px] relative z-10"
            loading="lazy"
            unoptimized
          />
          <div className="top-3 md:top-6 absolute flex w-full justify-center">
            <Image
              src={watchGIF}
              alt="gif of a man looking for osmething"
              width={185}
              className="md:h-[200px] md:w-[320px] h-[140px]"
              unoptimized
            />
          </div>
        </div>
      </section>
      <section className="border-t-4 border-b-4 border-primary">
        <LandingPromo id1={604685} id2={1084199} id3={1226578} color="rgba(139, 0, 0, 0.57)" />
      </section>
      <section className="bg-black">
        <Footer />
      </section>
    </main>
  );
}
