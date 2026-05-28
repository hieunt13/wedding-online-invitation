import Image from "next/image";
import type { TimelineItem } from "@/types/wedding.types";

interface TimelineSectionProps {
  items: TimelineItem[];
}

export function TimelineSection({ items }: TimelineSectionProps) {
  return (
    <section className="jmii-section jmii-timeline reveal-slide-right">
      <h3 className="jmii-timeline__title jmii-script">Mốc thời gian</h3>
      <div className="jmii-timeline__row">
        {items.map((item, index) => (
          <div key={`${item.time}-${item.label}`} className="jmii-timeline__item">
            {item.icon ? (
              <div className="jmii-timeline__icon">
                <Image src={item.icon} alt="" fill className="object-contain" sizes="80px" />
              </div>
            ) : null}
            <p className="jmii-timeline__time">{item.time}</p>
            <p className="jmii-timeline__label">{item.label}</p>
            {index < items.length - 1 ? <span className="jmii-timeline__connector" aria-hidden /> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
