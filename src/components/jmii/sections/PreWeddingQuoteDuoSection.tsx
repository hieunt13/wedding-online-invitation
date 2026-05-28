import Image from "next/image";

interface PreWeddingQuoteDuoSectionProps {
  photos: [string, string];
  quote: string;
}

export function PreWeddingQuoteDuoSection({ photos, quote }: PreWeddingQuoteDuoSectionProps) {
  return (
    <section className="jmii-pre-wedding-quote jmii-pre-wedding-quote--duo reveal-on-scroll">
      <div className="jmii-pre-wedding-quote__duo-photos">
        {photos.map((src, index) => (
          <div 
            key={`${src}-${index}`} 
            className={`jmii-pre-wedding-quote__duo-photo photo-reveal-${index + 1}`}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover object-center"
              sizes="45vw"
            />
          </div>
        ))}
      </div>
      <p className="jmii-pre-wedding-quote__duo-text quote-text-reveal">{quote}</p>
    </section>
  );
}
