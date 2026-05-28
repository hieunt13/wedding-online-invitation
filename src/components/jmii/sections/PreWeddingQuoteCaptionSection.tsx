import Image from "next/image";

interface PreWeddingQuoteCaptionSectionProps {
  photo: string;
  quote: string;
}

export function PreWeddingQuoteCaptionSection({
  photo,
  quote,
}: PreWeddingQuoteCaptionSectionProps) {
  return (
    <section className="jmii-pre-wedding-quote jmii-pre-wedding-quote--caption reveal-on-scroll">
      <div className="jmii-pre-wedding-quote__caption-photo photo-reveal-1">
        <Image src={photo} alt="" fill className="object-cover object-center" sizes="100vw" />
      </div>
      <p className="jmii-pre-wedding-quote__caption-text quote-text-reveal">{quote}</p>
    </section>
  );
}
