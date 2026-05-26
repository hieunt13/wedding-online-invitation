"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { GalleryConfig } from "@/types/wedding.types";

const AUTO_SCROLL_MS = 4000;

interface GallerySectionProps {
  gallery: GalleryConfig;
}

export function GallerySection({ gallery }: GallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = gallery.images;

  useEffect(() => {
    if (images.length <= 1) return;

    const id = window.setInterval(() => {
      setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    }, AUTO_SCROLL_MS);

    return () => window.clearInterval(id);
  }, [images.length]);

  if (!images.length) return null;

  return (
    <section
      className="jmii-section jmii-gallery reveal-on-scroll revealed"
      aria-label="Album ảnh cưới"
    >
      <div className="jmii-gallery__viewport">
        <div
          className="jmii-gallery__track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={`${src}-${index}`} className="jmii-gallery__slide">
              <Image
                src={src}
                alt={`Ảnh pre-wedding ${index + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
