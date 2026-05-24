"use client";

import { useEffect } from "react";

export function useParallax(elementId: string, speed: number = 0.4) {
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(elementId);
      if (element && window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [elementId, speed]);
}
