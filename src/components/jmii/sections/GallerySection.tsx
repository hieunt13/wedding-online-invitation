"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryConfig } from "@/types/wedding.types";

interface GallerySectionProps {
  gallery: GalleryConfig;
}

export function GallerySection({ gallery }: GallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = gallery.images;

  if (!images.length) return null;

  const goPrev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <section className="jmii-section jmii-gallery reveal-on-scroll">
      <div className="jmii-gallery__main">
        <button type="button" className="jmii-gallery__nav jmii-gallery__nav--prev" onClick={goPrev} aria-label="Ảnh trước">
          ‹
        </button>
        <div className="jmii-gallery__slide">
          <Image
            src={images[activeIndex]}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={activeIndex === 0}
          />
        </div>
      </div>

      <div className="jmii-gallery__thumbs">
        {images.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            className={`jmii-gallery__thumb${index === activeIndex ? " jmii-gallery__thumb--active" : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Xem ảnh ${index + 1}`}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="64px" />
          </button>
        ))}
      </div>
    </section>
  );
}
