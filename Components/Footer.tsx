import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="container mx-auto flex flex-col gap-8 pb-12 pt-24 text-center">
      <div className="relative flex items-center justify-center">
        <span className="absolute left-0 top-1/2 w-[25%] -translate-y-1/2 transform border-t border-white md:w-[40%]"></span>
        <ul className="z-10 flex gap-8">
          <li>
            <Link href="https://github.com/LucasMERN" className="group">
              <Github
                size={40}
                color="white"
                className="group-hover:scale-125"
              />
            </Link>
          </li>
          <li>
            <Link
              href="https://www.linkedin.com/in/lucaswinklerdev/"
              className="group"
            >
              <Linkedin
                size={40}
                color="white"
                className="group-hover:scale-125"
              />
            </Link>
          </li>
        </ul>
        <span className="absolute right-0 top-1/2 w-[25%] -translate-y-1/2 transform border-t border-white md:w-[40%]"></span>
      </div>
      <h3 className="text-xl font-medium text-white">
        Designed & Developed by{" "}
        <Link
          href="#"
          className="underline decoration-dashed decoration-1 underline-offset-4"
        >
          Lucas Winkler
        </Link>
      </h3>
      <h4 className="-mt-4 text-white">Copyright © 2024 Lucas Winkler</h4>
    </footer>
  );
};

export default Footer;
