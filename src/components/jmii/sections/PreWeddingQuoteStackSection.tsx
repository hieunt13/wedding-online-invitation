import Image from "next/image";

interface PreWeddingQuoteStackSectionProps {
  photos: [string, string];
  quote: string;
}

export function PreWeddingQuoteStackSection({ photos, quote }: PreWeddingQuoteStackSectionProps) {
  return (
    <section className="jmii-pre-wedding-quote jmii-pre-wedding-quote--stack reveal-on-scroll">
      <div className="jmii-pre-wedding-quote__stack-photos">
        {photos.map((src, index) => (
          <div 
            key={`${src}-${index}`} 
            className={`jmii-pre-wedding-quote__stack-photo photo-reveal-${index + 1}`}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}
      </div>
      <p className="jmii-pre-wedding-quote__stack-text quote-text-reveal">{quote}</p>
    </section>
  );
}
