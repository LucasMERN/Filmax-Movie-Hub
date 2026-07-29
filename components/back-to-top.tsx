'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    isVisible && (
      <Button
        onClick={scrollToTop}
        variant="outline"
        className="fixed right-8 bottom-24 z-50 size-12 animate-bounce rounded-full border border-primary bg-primary text-white shadow-lg focus:outline-none lg:right-20"
        aria-label="click to return to the top of the page"
      >
        <ArrowUp className="size-6" />
      </Button>
    )
  );
}
