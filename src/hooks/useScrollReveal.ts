"use client";

import { useEffect } from "react";

function revealIfInView(el: Element) {
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.92) {
    el.classList.add("revealed");
  }
}

export function useScrollReveal(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const observeAll = () => {
      const elements = document.querySelectorAll(".reveal-on-scroll:not(.revealed)");
      elements.forEach((el) => {
        revealIfInView(el);
        observer.observe(el);
      });
    };

    observeAll();

    const retry = window.setTimeout(observeAll, 150);
    const retryLate = window.setTimeout(observeAll, 500);

    return () => {
      window.clearTimeout(retry);
      window.clearTimeout(retryLate);
      observer.disconnect();
    };
  }, [enabled]);
}
