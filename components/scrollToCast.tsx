import { ChevronsRight } from "lucide-react";
import React from "react";

function ScrollToCast({ scrollToCast }: { scrollToCast: () => void }) {
  return (
    <button
      onClick={scrollToCast}
      className="dark-shadow group group flex items-center gap-1 text-sm font-semibold text-white/60 underline-offset-2 hover:text-white hover:underline"
    >
      See Full Cast{" "}
      <ChevronsRight
        size={20}
        className="dark-shadow underline-offset-2 transition-transform group-hover:animate-wiggle group-hover:text-white group-hover:underline"
      />
    </button>
  );
}

export default ScrollToCast;
