"use client";

import type { ReceptionBlock } from "@/types/wedding.types";

interface ReceptionSectionProps {
  reception: ReceptionBlock;
  highlightDay: number;
}

const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

function MiniCalendar({ monthLabel, highlightDay }: { monthLabel: string; highlightDay: number }) {
  const [monthName, yearStr] = monthLabel.split("/").map((s) => s.trim());
  const year = parseInt(yearStr, 10);
  const monthIndex = monthName.toLowerCase().includes("tháng")
    ? parseInt(monthName.replace(/\D/g, ""), 10) - 1
    : 9;

  const firstDay = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startOffset = (firstDay.getDay() + 6) % 7;

  const cells: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="hm-calendar mx-auto mt-10 max-w-xs rounded-lg border border-hm-green/15 bg-white/50 p-4">
      <p className="hm-label text-center text-hm-green mb-4">{monthLabel}</p>
      <div className="grid grid-cols-7 gap-1 text-center hm-body-sm text-hm-green mb-2">
        {WEEKDAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center hm-body-sm text-hm-green">
        {cells.map((day, i) => (
          <span
            key={i}
            className={`flex h-8 items-center justify-center rounded-full ${
              day === highlightDay ? "bg-hm-green text-white font-semibold" : ""
            }`}
          >
            {day ?? ""}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ReceptionSection({ reception, highlightDay }: ReceptionSectionProps) {
  if (reception.venueName) {
    return (
      <section className="hm-section reveal-on-scroll reveal-delay-5 relative px-6 py-14 text-center">
        <p className="hm-label text-hm-green mb-4">{reception.title}</p>

        <div className="mx-auto mb-8 h-px max-w-[200px] border-t border-dotted border-hm-green/30" />

        <p className="hm-body text-hm-green leading-relaxed max-w-md mx-auto mb-10 tracking-wide">
          {reception.subtitle}
        </p>

        {reception.venueType && (
          <p className="hm-label text-hm-green mb-2">{reception.venueType}</p>
        )}

        <p className="hm-display-venue text-hm-green mb-2">{reception.venueName}</p>

        {reception.venueHall && (
          <p className="hm-body text-hm-green mb-4 tracking-wide">{reception.venueHall}</p>
        )}

        {reception.address && (
          <p className="hm-body-sm text-hm-green leading-relaxed max-w-xs mx-auto mb-10">
            {reception.address}
          </p>
        )}

        {reception.timeDetail && (
          <p className="hm-body-sm text-hm-green mb-6 tracking-wide">{reception.timeDetail}</p>
        )}

        {reception.dateDisplay && (
          <p className="hm-display-date text-hm-green mb-6">{reception.dateDisplay}</p>
        )}

        {reception.lunarDate && (
          <p className="hm-body text-hm-green mb-10">{reception.lunarDate}</p>
        )}

        {reception.closingLine1 && (
          <p className="hm-body text-hm-green leading-relaxed max-w-sm mx-auto mb-2">
            {reception.closingLine1}
          </p>
        )}
        {reception.closingLine2 && (
          <p className="hm-body text-hm-green mb-8">{reception.closingLine2}</p>
        )}

        {reception.scheduleNote && (
          <p className="hm-body-sm tracking-wide text-hm-green mb-6">{reception.scheduleNote}</p>
        )}

        <MiniCalendar monthLabel={reception.calendarMonthLabel} highlightDay={highlightDay} />
      </section>
    );
  }

  return (
    <section className="hm-section reveal-on-scroll reveal-delay-5 relative px-6 py-14 text-center">
      <h2 className="hm-label text-hm-green mb-2">{reception.title}</h2>
      <p className="hm-body-sm text-hm-green mb-8">{reception.subtitle}</p>
      <p className="hm-display-time text-hm-green mb-10">{reception.time}</p>
      <MiniCalendar monthLabel={reception.calendarMonthLabel} highlightDay={highlightDay} />
    </section>
  );
}
