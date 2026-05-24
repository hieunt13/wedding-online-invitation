import Image from "next/image";
import type { DresscodeConfig } from "@/types/wedding.types";

interface DresscodeSectionProps {
  dresscode: DresscodeConfig;
}

export function DresscodeSection({ dresscode }: DresscodeSectionProps) {
  return (
    <section className="jmii-section jmii-dresscode reveal-on-scroll">
      <h3 className="jmii-dresscode__title jmii-script">{dresscode.title}</h3>

      <div className="jmii-dresscode__swatches">
        <span
          className="jmii-dresscode__circle jmii-dresscode__circle--left"
          style={{ backgroundColor: dresscode.colorLeft ?? "#f5f0e8" }}
        />
        <span
          className="jmii-dresscode__circle jmii-dresscode__circle--right"
          style={{ backgroundColor: dresscode.colorRight ?? "#c4a882" }}
        />
      </div>

      <div className="jmii-dresscode__split">
        {dresscode.monetImage ? (
          <div className="jmii-dresscode__monet">
            <Image src={dresscode.monetImage} alt="" fill className="object-cover" sizes="50vw" />
          </div>
        ) : null}
        <div className="jmii-dresscode__quote-panel">
          <p className="jmii-dresscode__subtitle jmii-script">{dresscode.subtitle}</p>
        </div>
      </div>
    </section>
  );
}
