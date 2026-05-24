import type { LoveStoryConfig } from "@/types/wedding.types";

interface LoveStorySectionProps {
  loveStory: LoveStoryConfig;
}

export function LoveStorySection({ loveStory }: LoveStorySectionProps) {
  return (
    <section className="jmii-section jmii-story reveal-on-scroll">
      {loveStory.sectionTitle ? (
        <h2 className="jmii-story__heading jmii-script">{loveStory.sectionTitle}</h2>
      ) : null}
      {loveStory.paragraphs.map((paragraph, index) => (
        <p key={index} className="jmii-story__text">
          {paragraph}
        </p>
      ))}
    </section>
  );
}
