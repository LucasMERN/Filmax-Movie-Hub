import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="container mx-auto flex flex-col gap-8 pt-24 pb-12 text-center">
      <div className="relative flex items-center justify-center">
        <span className="absolute top-1/2 left-0 w-[25%] -translate-y-1/2 transform border-t border-white md:w-[40%]"></span>
        <ul className="z-10 flex gap-8">
          <li>
            <Link
              aria-label="Click to go to Lucas Winkler's GitHub profile"
              title="Click to go to Lucas Winkler's GitHub profile"
              href="https://github.com/LucasMERN"
              className="group"
              target="_blank"
            >
              <Github
                size={40}
                color="white"
                className="transition-transform group-hover:scale-125"
              />
            </Link>
          </li>
          <li>
            <Link
              aria-label="Click to go to Lucas Winkler's Linkedin profile"
              title="Click to go to Lucas Winkler's Linkedin profile"
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
        <span className="absolute top-1/2 right-0 w-[25%] -translate-y-1/2 transform border-t border-white md:w-[40%]"></span>
      </div>
      <h3 className="text-xl font-medium text-white">
        Designed & Developed by{' '}
        <Link
          aria-label="Click to go to Lucas Winkler's portfolio site"
          title="Click to go to Lucas Winkler's portfolio site"
          href="#"
          className="underline decoration-dashed decoration-1 underline-offset-4 transition-all hover:font-bold"
        >
          Lucas Winkler
        </Link>
      </h3>
      <h4 className="-mt-4 text-white">Copyright © 2024 Lucas Winkler</h4>
    </footer>
  );
};

export default Footer;
