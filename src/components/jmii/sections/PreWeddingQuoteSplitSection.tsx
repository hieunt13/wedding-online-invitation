import Image from "next/image";

interface PreWeddingQuoteSplitSectionProps {
  photo: string;
  quote: string;
  reverse?: boolean;
}

export function PreWeddingQuoteSplitSection({
  photo,
  quote,
  reverse = false,
}: PreWeddingQuoteSplitSectionProps) {
  return (
    <section
      className={`jmii-pre-wedding-quote reveal-on-scroll${reverse ? " jmii-pre-wedding-quote--reverse" : ""}`}
    >
      <div className="jmii-pre-wedding-quote__split">
        <div className={`jmii-pre-wedding-quote__photo ${reverse ? 'photo-reveal-right' : 'photo-reveal-left'}`}>
          <Image src={photo} alt="" fill className="object-cover object-center" sizes="50vw" />
        </div>
        <div className="jmii-pre-wedding-quote__text quote-text-reveal">
          <p className="jmii-pre-wedding-quote__quote jmii-script">{quote}</p>
        </div>
      </div>
    </section>
  );
}
