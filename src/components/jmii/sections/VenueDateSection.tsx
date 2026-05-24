import type { EventConfig } from "@/types/wedding.types";

interface VenueDateSectionProps {
  event: EventConfig;
}

export function VenueDateSection({ event }: VenueDateSectionProps) {
  return (
    <section className="jmii-section jmii-venue reveal-on-scroll">
      <p className="jmii-venue__time">{event.timeLine}</p>

      <div className="jmii-date-block">
        <div className="jmii-date-block__side">
          <span className="jmii-date-block__line" />
          <p>{event.month}</p>
          <span className="jmii-date-block__line" />
        </div>
        <p className="jmii-date-block__day">{event.day}</p>
        <div className="jmii-date-block__side">
          <span className="jmii-date-block__line" />
          <p>{event.year}</p>
          <span className="jmii-date-block__line" />
        </div>
      </div>

      <p className="jmii-venue__lunar">{event.lunarDate}</p>

      <p className="jmii-venue__hosted">{event.hostedAtLabel}</p>
      <h2 className="jmii-venue__name">{event.venueName}</h2>
      <p className="jmii-venue__address">{event.address}</p>

      <a
        href={event.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="jmii-maps-link"
      >
        <span className="jmii-maps-link__pin" aria-hidden>
          📍
        </span>
        {event.mapsLabel}
      </a>
    </section>
  );
}
