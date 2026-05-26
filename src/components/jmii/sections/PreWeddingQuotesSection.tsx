import { PreWeddingQuoteCaptionSection } from "@/components/jmii/sections/PreWeddingQuoteCaptionSection";
import { PreWeddingQuoteDuoSection } from "@/components/jmii/sections/PreWeddingQuoteDuoSection";
import { PreWeddingQuoteStackSection } from "@/components/jmii/sections/PreWeddingQuoteStackSection";
import { PreWeddingQuoteStaggerSection } from "@/components/jmii/sections/PreWeddingQuoteStaggerSection";
import { PreWeddingQuoteSplitSection } from "@/components/jmii/sections/PreWeddingQuoteSplitSection";
import { QuoteBannerSection } from "@/components/jmii/sections/QuoteBannerSection";
import type { PreWeddingQuoteItem, PreWeddingQuotesConfig } from "@/types/wedding.types";

interface PreWeddingQuotesSectionProps {
  preWeddingQuotes: PreWeddingQuotesConfig;
}

function isValidItem(item: PreWeddingQuoteItem) {
  if (!item.quote?.trim()) return false;
  if (item.layout === "stack" || item.layout === "duo" || item.layout === "stagger") {
    return item.photos?.length === 2 && item.photos.every(Boolean);
  }
  return Boolean(item.photo);
}

export function PreWeddingQuotesSection({ preWeddingQuotes }: PreWeddingQuotesSectionProps) {
  const items = preWeddingQuotes.items.filter(isValidItem);
  if (!items.length) return null;

  let splitIndex = 0;

  return (
    <div className="jmii-pre-wedding-quotes">
      {items.map((item, index) => {
        if (item.layout === "stack" && item.photos) {
          return (
            <PreWeddingQuoteStackSection
              key={`stack-${index}`}
              photos={item.photos}
              quote={item.quote}
            />
          );
        }

        if (item.layout === "duo" && item.photos) {
          return (
            <PreWeddingQuoteDuoSection
              key={`duo-${index}`}
              photos={item.photos}
              quote={item.quote}
            />
          );
        }

        if (item.layout === "stagger" && item.photos) {
          return (
            <PreWeddingQuoteStaggerSection
              key={`stagger-${index}`}
              photos={item.photos}
              quote={item.quote}
            />
          );
        }

        if (item.layout === "caption" && item.photo) {
          return (
            <PreWeddingQuoteCaptionSection
              key={`caption-${index}`}
              photo={item.photo}
              quote={item.quote}
            />
          );
        }

        if (item.layout === "split" && item.photo) {
          const reverse = item.reverse ?? splitIndex % 2 === 1;
          splitIndex += 1;
          return (
            <PreWeddingQuoteSplitSection
              key={`${item.photo}-${index}`}
              photo={item.photo}
              quote={item.quote}
              reverse={reverse}
            />
          );
        }

        if (!item.photo) return null;

        return (
          <QuoteBannerSection
            key={`${item.photo}-${index}`}
            photo={item.photo}
            quote={item.quote}
          />
        );
      })}
    </div>
  );
}
