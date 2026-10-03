import type { WeddingConfig } from "@/types/wedding.types";

/** Merge config thiệp cưới với overrides báo hỷ (không ngày trên banner). */
export function getAnnouncementConfig(config: WeddingConfig): WeddingConfig {
  const overrides = config.announcement;
  if (!overrides) return config;

  const { clearBannerOverlayDate, ...heroOverrides } = overrides.hero ?? {};
  const hero: WeddingConfig["hero"] = {
    ...config.hero,
    ...heroOverrides,
  };

  if (clearBannerOverlayDate !== false) {
    delete hero.bannerOverlayDate;
  }

  return {
    ...config,
    meta: {
      ...config.meta,
      ...overrides.meta,
    },
    cover: {
      ...config.cover,
      ...overrides.cover,
    },
    hero,
    event: {
      ...config.event,
      ...overrides.event,
    },
    loveStory: {
      ...config.loveStory,
      ...overrides.loveStory,
      paragraphs: overrides.loveStory?.paragraphs ?? config.loveStory.paragraphs,
    },
    footer: {
      ...config.footer,
      ...overrides.footer,
    },
  };
}
