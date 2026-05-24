"use client";

import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";

interface HeroSectionProps {
  bride: string;
  groom: string;
  date: string;
  heroImage: string;
}

export function HeroSection({ bride, groom, date, heroImage }: HeroSectionProps) {
  useParallax("parallax-bg", 0.4);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center text-center px-margin-mobile overflow-hidden">
      <div className="absolute inset-0 z-0 scale-110" id="parallax-bg">
        <Image
          src={heroImage}
          alt="Wedding couple"
          fill
          className="object-cover grayscale-[20%] brightness-[0.8]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-background" />
      </div>

      <div className="relative z-10 space-y-unit max-w-lg">
        <span className="font-label-caps text-label-caps text-white/90 tracking-[0.3em] uppercase block mb-4">
          The Wedding Of
        </span>
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:text-display-lg text-white leading-tight">
          {bride}{" "}
          <span className="block italic font-light text-tertiary-fixed-dim">and</span>{" "}
          {groom}
        </h1>
        <div className="h-px w-12 bg-tertiary-fixed/60 mx-auto my-6" />
        <p className="font-headline-sm text-headline-sm text-white/90 font-light tracking-wide">
          {formatDate(date)}
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-white/80 to-transparent" />
        <span className="font-label-caps text-[10px] text-white/60 tracking-widest uppercase">
          Scroll
        </span>
      </div>
    </section>
  );
}
