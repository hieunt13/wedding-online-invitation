import type { CalendarConfig } from "@/types/wedding.types";

/** October 2026 — starts Thursday, 31 days; day 11 is Sunday */
const DEFAULT_SCATTERED: (number | string)[][] = [
  ["mon", "tue", "wed", "thur", "fri", "sat", "sun"],
  [5, 6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25],
];

interface CalendarSectionProps {
  calendar: CalendarConfig;
  backgroundImage?: string;
}

function isWeekday(cell: number | string) {
  return typeof cell === "string" && !/^\d+$/.test(cell);
}

export function CalendarSection({ calendar, backgroundImage }: CalendarSectionProps) {
  const rows = calendar.scatteredRows ?? DEFAULT_SCATTERED;

  return (
    <section
      className="jmii-section jmii-calendar reveal-scale-in float-animation"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
    >
      <div className="jmii-calendar__inner">
        <h3 className="jmii-calendar__month jmii-script">{calendar.monthLabel}</h3>

        <div className="jmii-calendar__scattered">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="jmii-calendar__row"
              style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}
            >
              {row.map((cell, cellIndex) => {
                if (cell === "" || cell === null) {
                  return (
                    <span key={cellIndex} className="jmii-calendar__cell jmii-calendar__cell--empty" />
                  );
                }

                const isDay = typeof cell === "number";
                const active = isDay && cell === calendar.highlightDay;

                return (
                  <span
                    key={cellIndex}
                    className={[
                      "jmii-calendar__cell",
                      isWeekday(cell) ? "jmii-calendar__cell--weekday" : "",
                      active ? "jmii-calendar__day--active" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {active ? <span className="jmii-calendar__heart">{cell}</span> : cell}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
