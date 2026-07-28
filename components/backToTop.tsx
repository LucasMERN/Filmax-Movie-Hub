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
        className="bottom-24 right-8 animate-bounce px-3 py-6 text-white shadow-lg lg:right-20 fixed z-50 rounded-full border border-primary bg-primary text-primary focus:outline-none"
        aria-label="click to return to the top of the page"
      >
        <ArrowUp size={24} />
      </Button>
    )
  );
}
