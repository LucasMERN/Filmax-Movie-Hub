import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="gap-8 pb-12 pt-24 container mx-auto flex flex-col text-center">
      <div className="relative flex items-center justify-center">
        <span className="left-0 border-white md:w-[40%] absolute top-1/2 w-[25%] -translate-y-1/2 transform border-t"></span>
        <ul className="gap-8 z-10 flex">
          <li>
            <Link href="https://github.com/LucasMERN" className="group" target="_blank">
              <Github
                size={40}
                color="white"
                className="transition-transform group-hover:scale-125"
              />
            </Link>
          </li>
          <li>
            <Link
              href="https://www.linkedin.com/in/lucaswinklerdev/"
              className="group"
              target="_blank"
            >
              <Linkedin
                size={40}
                color="white"
                className="transition-transform group-hover:scale-125"
              />
            </Link>
          </li>
        </ul>
        <span className="right-0 border-white md:w-[40%] absolute top-1/2 w-[25%] -translate-y-1/2 transform border-t"></span>
      </div>
      <h3 className="text-xl font-medium text-white">
        Designed & Developed by{' '}
        <Link
          href="#"
          className="hover:font-bold underline decoration-dashed decoration-1 underline-offset-4 transition-all"
        >
          Lucas Winkler
        </Link>
      </h3>
      <h4 className="-mt-4 text-white">Copyright © 2024 Lucas Winkler</h4>
    </footer>
  );
};

export default Footer;
