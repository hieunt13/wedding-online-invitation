import Image from "next/image";

interface QuoteBannerSectionProps {
  photo: string;
  quote?: string;
}

export function QuoteBannerSection({ photo, quote }: QuoteBannerSectionProps) {
  if (!quote) return null;

  return (
    <section className="jmii-quote-banner reveal-on-scroll">
      <div className="jmii-quote-banner__photo">
        <Image src={photo} alt="" fill className="object-cover object-bottom" sizes="100vw" />
        <div className="jmii-quote-banner__overlay" />
        <p className="jmii-quote-banner__text jmii-script">{quote}</p>
      </div>
    </section>
  );
}
