import type { GiftConfig } from "@/types/wedding.types";

interface GiftSectionProps {
  gift: GiftConfig;
  weddingDate: string;
}

export function GiftSection({ gift, weddingDate }: GiftSectionProps) {
  const date = new Date(weddingDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return (
    <section className="jmii-section jmii-gift reveal-on-scroll">
      <div className="jmii-gift__date">
        <span>{day}</span>
        <span>{month}</span>
      </div>
    </section>
  );
}
