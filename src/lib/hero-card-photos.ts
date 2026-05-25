import type { HeroConfig } from "@/types/wedding.types";

/** Ảnh trong thiệp hero: ưu tiên cardPhotos, không thì heroPhoto (+ secondary). */
export function resolveHeroCardPhotos(hero: HeroConfig): string[] {
  const fromConfig = hero.cardPhotos?.filter(Boolean) ?? [];
  if (fromConfig.length > 0) return fromConfig;

  const fallback = [hero.heroPhoto, hero.heroPhotoSecondary].filter(
    (src): src is string => Boolean(src),
  );
  return [...new Set(fallback)];
}
