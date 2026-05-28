import Image from "next/image";

interface PreWeddingQuoteStaggerSectionProps {
  photos: [string, string];
  quote: string;
}

export function PreWeddingQuoteStaggerSection({
  photos,
  quote,
}: PreWeddingQuoteStaggerSectionProps) {
  return (
    <section className="jmii-pre-wedding-quote jmii-pre-wedding-quote--stagger reveal-on-scroll">
      <div className="jmii-pre-wedding-quote__stagger">
        <div className="jmii-pre-wedding-quote__stagger-photo jmii-pre-wedding-quote__stagger-photo--left photo-reveal-left">
          <Image
            src={photos[0]}
            alt=""
            fill
            className="object-cover object-center"
            sizes="78vw"
          />
        </div>
        <div className="jmii-pre-wedding-quote__stagger-photo jmii-pre-wedding-quote__stagger-photo--right photo-reveal-right">
          <Image
            src={photos[1]}
            alt=""
            fill
            className="object-cover object-center"
            sizes="78vw"
          />
        </div>
        <p className="jmii-pre-wedding-quote__stagger-text quote-text-reveal">{quote}</p>
      </div>
    </section>
  );
}
