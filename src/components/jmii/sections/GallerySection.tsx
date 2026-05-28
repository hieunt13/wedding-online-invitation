"use client";

import Image from "next/image";
import type { GalleryConfig } from "@/types/wedding.types";

interface GallerySectionProps {
  gallery: GalleryConfig;
}

export function GallerySection({ gallery }: GallerySectionProps) {
  const items = gallery.images
    .map((img) => (typeof img === "string" ? { src: img } : img))
    .filter((img) => Boolean(img.src));

  if (!items.length) return null;

  return (
    <section className="jmii-section jmii-gallery" aria-label="Album ảnh cưới">
      <div className="jmii-gallery-mosaic" aria-label="Triển lãm ảnh">
        {items.map((item, index) => {
          const captionId = `jmii-gallery-caption-${index}`;
          const colSpan = Math.max(1, Math.min(12, item.colSpan ?? 4));
          const rowSpan = Math.max(1, Math.min(40, item.rowSpan ?? 14));

          return (
            <figure
              key={`${item.src}-${index}`}
              className="jmii-gallery-mosaic__tile reveal-fade-up"
              style={{
                transitionDelay: `${Math.min(index, 16) * 70}ms`,
                gridColumn: `span ${colSpan}`,
                gridRow: `span ${rowSpan}`,
              }}
              aria-describedby={item.caption ? captionId : undefined}
            >
              <div className="jmii-gallery-mosaic__mat">
                <div className="jmii-gallery-mosaic__photo">
                  <Image
                    src={item.src}
                    alt={item.caption ? item.caption : `Ảnh pre-wedding ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="(min-width: 900px) 25vw, 50vw"
                    priority={index < 2}
                    draggable={false}
                  />
                </div>
              </div>
              {item.caption ? (
                <figcaption className="jmii-gallery-mosaic__caption" id={captionId}>
                  {item.caption}
                </figcaption>
              ) : null}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
