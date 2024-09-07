"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/Components/ui/Button";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > window.innerHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    isVisible && (
      <Button
        onClick={scrollToTop}
        variant="outline"
        className="fixed bottom-24 right-6 z-50 rounded-full px-3 py-6 border border-primary text-primary shadow-lg bg-primary text-white focus:outline-none animate-bounce"
        aria-label="click to return to the top of the page"
      >
        <ArrowUp size={24} />
      </Button>
    )
  );
}