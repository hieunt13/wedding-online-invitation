import weddingConfig from "@/config/wedding.config.json";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import type { WeddingConfig } from "@/types/wedding.types";

function resolveOgImagePath(config: WeddingConfig): string {
  return (
    config.meta.ogImage ??
    config.cover.backgroundImage ??
    config.heroBannerPhoto ??
    config.hero.heroPhoto ??
    "/images/pre-wedding1.jpg"
  );
}

export function buildWeddingMetadata(config: WeddingConfig = weddingConfig as WeddingConfig): Metadata {
  const siteUrl = getSiteUrl();
  const ogImagePath = resolveOgImagePath(config);
  const ogImageUrl = absoluteUrl(ogImagePath, siteUrl);

  return {
    metadataBase: siteUrl,
    title: config.meta.title,
    description: config.meta.description,
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: siteUrl,
      siteName: config.meta.title,
      title: config.meta.title,
      description: config.meta.description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: config.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.meta.title,
      description: config.meta.description,
      images: [ogImageUrl],
    },
  };
}
