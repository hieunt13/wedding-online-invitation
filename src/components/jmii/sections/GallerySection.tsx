"use client";

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import type { GalleryConfig } from "@/types/wedding.types";

const AUTO_PLAY_MS = 4000;

interface GallerySectionProps {
  gallery: GalleryConfig;
}

export function GallerySection({ gallery }: GallerySectionProps) {
  const images = gallery.images;
  const hasMany = images.length > 1;

  if (!images.length) return null;

  return (
    <section
      className="jmii-section jmii-gallery reveal-on-scroll revealed"
      aria-label="Album ảnh cưới"
    >
      <Carousel
        className="jmii-gallery__carousel"
        infiniteLoop={hasMany}
        autoPlay={hasMany}
        interval={AUTO_PLAY_MS}
        stopOnHover
        swipeable
        emulateTouch
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        showIndicators={hasMany}
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
              draggable={false}
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
}
