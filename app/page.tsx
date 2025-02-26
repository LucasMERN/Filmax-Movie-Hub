import logo from "@/public/logo.svg";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LandingPromo from "@/components/landingPromo";
import download from "@/public/landingdownload.jpg";
import watch from "@/public/landingwatch.png";
import watchGIF from "@/public/watchGIF.gif";
import stranger from "@/public/stranger.png";
import loader from "@/public/loader.gif";
import Footer from "@/components/footer";
import type { Metadata } from "next";
import AuthButton from "@/components/authButton";

export const metadata: Metadata = {
  title: "Welcome to Filmax Cinema Hub",
  description: "Landing page for Filmax Cinema Hub",
};

export default async function Home() {
  return (
    <main className="min-h-screen bg-black">
      <nav className="absolute z-20 w-full bg-gradient-to-b from-black pb-8 pt-8">
        <div className="container mx-auto flex justify-between">
          <Link href="/">
            <Image
              src={logo}
              width={50}
              alt="Filmax Logo"
              priority={true}
              className="-mt-1"
              loading="eager"
            />
          </Link>
          <AuthButton />
        </div>
      </nav>
      <section
        className="relative h-[450px] w-full overflow-hidden border-b-4 border-primary lg:h-[650px]"
        style={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.00) 43.75%, rgba(0, 0, 0, 0.80) 100%), url('/homehero.png') lightgray 50% / cover no-repeat`,
        }}
      >
        <div className="relative z-10 flex flex-col items-center gap-4 pt-36 text-center lg:pt-52">
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
          className="absolute bottom-0 z-20 h-24 w-full"
          style={{
            background: "linear-gradient(to top, black 0%, transparent 100%)",
          }}
        ></div>
      </section>
      <section className="container flex flex-col items-center justify-center gap-10 py-24 lg:flex-row">
        <div className="relative">
          <Image
            src={download}
            alt=""
            width={500}
            className="-mt-16"
            loading="eager"
          />
          <div className="absolute bottom-4 flex w-full justify-center">
            <div className="flex items-center justify-between rounded-xl border border-primary bg-black p-2 shadow-lg lg:p-4">
              <Image
                src={stranger}
                alt=""
                className="w-11 lg:w-14"
                loading="eager"
              />
              <div className="flex flex-col pl-4 pr-14">
                <h4 className="whitespace-nowrap font-bold text-white">
                  Stranger Things
                </h4>
                <span className="text-[#0071EB]">Downloading...</span>
              </div>
              <Image
                src={loader}
                alt="loading animation"
                className="aspect-square h-11 w-11"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 text-white">
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
      <section className="container flex flex-col items-center justify-center gap-10 py-24 lg:flex-row">
        <div className="flex flex-col gap-5 text-white">
          <h3 className="text-2xl font-bold lg:text-5xl">Watch Everywhere.</h3>
          <p className="lg:text-2xl">
            Stream unlimited movies and TV shows on <br /> your phone, tablet,
            laptop, and TV without <br /> paying more.
          </p>
        </div>
        <div className="relative">
          <Image
            src={watch}
            alt="various devices for watching movies"
            width={300}
            className="relative z-10 md:w-[500px]"
            loading="lazy"
            unoptimized
          />
          <div className="absolute top-3 flex w-full justify-center md:top-6">
            <Image
              src={watchGIF}
              alt="gif of a man looking for osmething"
              width={185}
              className="h-[140px] md:h-[200px] md:w-[320px]"
              unoptimized
            />
          </div>
        </div>
      </section>
      <section className="border-b-4 border-t-4 border-primary">
        <LandingPromo
          id1={604685}
          id2={1084199}
          id3={1226578}
          color="rgba(139, 0, 0, 0.57)"
        />
      </section>
      <section className="bg-black">
        <Footer />
      </section>
    </main>
  );
}
