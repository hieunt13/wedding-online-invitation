import Image from "next/image";
import type { GalleryImage } from "@/types/wedding.types";

interface PhotoGalleryProps {
  images: GalleryImage[];
  moreCount?: number;
}

export function PhotoGallery({ images, moreCount = 0 }: PhotoGalleryProps) {
  const [first, second] = images;

  return (
    <section className="hm-section reveal-on-scroll reveal-delay-4 relative px-6 py-12">
      <p className="text-center font-body text-xs tracking-[0.25em] text-hm-green mb-8">
        ALBUM ẢNH CƯỚI
      </p>

      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        {first && (
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
            <Image src={first.url} alt={first.alt} fill className="object-cover" sizes="50vw" />
          </div>
        )}
        {second && (
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
            <Image src={second.url} alt={second.alt} fill className="object-cover" sizes="50vw" />
            {moreCount > 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-hm-green/40">
                <span className="font-display text-white text-3xl">+{moreCount}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
