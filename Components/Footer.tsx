import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="container mx-auto flex flex-col gap-8 py-24 text-center">
      <div className="relative flex items-center justify-center">
        <span className="absolute left-0 top-1/2 w-[40%] -translate-y-1/2 transform border-t border-white"></span>
        <ul className="z-10 flex gap-4">
          <li>
            <Github size={40} color="white" />
          </li>
          <li>
            <Linkedin size={40} color="white" />
          </li>
        </ul>
        <span className="absolute right-0 top-1/2 w-[40%] -translate-y-1/2 transform border-t border-white"></span>
      </div>
      <h3 className="text-xl font-medium text-white">
        Designed & Developed by{" "}
        <Link href="#" className="underline decoration-dashed decoration-1 underline-offset-4">
          Lucas Winkler
        </Link>
      </h3>
      <h4 className="text-white -mt-4">
        Copyright © 2024 Lucas Winkler
      </h4>
    </footer>
  );
};

export default Footer;
