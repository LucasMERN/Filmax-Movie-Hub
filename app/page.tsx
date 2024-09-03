import dashboard from "@/public/homehero.jpg";
import logo from "@/public/logo.svg";
import Link from "next/link";
import BackgroundImage from "@/Components/ui/BackgroundImage";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/Components/ui/Button";
import LandingPromo from "@/Components/LandingPromo";

export default function Home() {
  return (
    <main className="min-h-screen">
      <nav className="absolute z-20 w-full bg-gradient-to-b from-black pb-8 pt-8">
        <div className="container mx-auto flex justify-between">
          <Link href="/">
            <Image
              src={logo}
              width={50}
              alt="Filmax Logo"
              priority={true}
              className="-mb-1"
              loading="eager"
            />
          </Link>
          <Button type="submit" variant="secondary" size="sm">
            Sign In
          </Button>
        </div>
      </nav>
      <section className="relative h-[550px] w-full overflow-hidden border-b-4 border-primary">
        <BackgroundImage
          src={dashboard}
          alt="dashboard screenshot"
          className="!h-[190%]"
          lazy="eager"
          priority={true}
        />
        <div className="relative z-10 flex flex-col items-center gap-6 pt-52 text-center">
          <h1 className="dark-shadow text-4xl font-extrabold text-white">
            Unlimited movies, all the <br />
            TV shows, and more.
          </h1>
          <h2 className="dark-shadow text-2xl font-medium text-white">
            FILMAX has got you covered!
          </h2>
          <p className="dark-shadow -mb-4 font-light text-white">
            Ready to find your next binge?
          </p>
          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md bg-primary px-8 text-xl font-medium text-white"
          >
            Get Started
            <ChevronRight className="pl-3" size={40} />
          </Link>
        </div>
      </section>
      <LandingPromo />
    </main>
  );
}
