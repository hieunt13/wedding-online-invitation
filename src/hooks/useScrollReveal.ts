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
      const selectors = [
        ".reveal-on-scroll:not(.revealed)",
        ".reveal-fade-up:not(.revealed)",
        ".reveal-slide-left:not(.revealed)",
        ".reveal-slide-right:not(.revealed)",
        ".reveal-scale-in:not(.revealed)",
        ".photo-reveal-1:not(.revealed)",
        ".photo-reveal-2:not(.revealed)",
        ".photo-reveal-left:not(.revealed)",
        ".photo-reveal-right:not(.revealed)",
        ".quote-text-reveal:not(.revealed)",
        ".couple-card-left:not(.revealed)",
        ".couple-card-right:not(.revealed)"
      ];
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
          revealIfInView(el);
          observer.observe(el);
        });
      });
    };

    observeAll();

    const retry = window.setTimeout(observeAll, 150);
    const retryLate = window.setTimeout(observeAll, 500);

    const page = document.querySelector(".jmii-page");
    let mutationObserver: MutationObserver | undefined;
    if (page) {
      mutationObserver = new MutationObserver(() => {
        observeAll();
      });
      mutationObserver.observe(page, { childList: true, subtree: true });
    }

    return () => {
      window.clearTimeout(retry);
      window.clearTimeout(retryLate);
      mutationObserver?.disconnect();
      observer.disconnect();
    };
  }, [enabled]);
}
