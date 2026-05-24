"use client";

import { useCountdown } from "@/hooks/useCountdown";

interface CountdownSectionProps {
  weddingDate: string;
  label: string;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function CountdownSection({ weddingDate, label }: CountdownSectionProps) {
  const { days, hours, minutes, seconds } = useCountdown(weddingDate);

  return (
    <section className="jmii-section jmii-countdown reveal-on-scroll">
      <h3 className="jmii-countdown__title">{label}</h3>
      <div className="jmii-countdown__grid">
        <div className="jmii-countdown__cell">
          <span className="jmii-countdown__num">{pad(days)}</span>
        </div>
        <span className="jmii-countdown__sep">:</span>
        <div className="jmii-countdown__cell">
          <span className="jmii-countdown__num">{pad(hours)}</span>
        </div>
        <span className="jmii-countdown__sep">:</span>
        <div className="jmii-countdown__cell">
          <span className="jmii-countdown__num">{pad(minutes)}</span>
        </div>
        <span className="jmii-countdown__sep">:</span>
        <div className="jmii-countdown__cell">
          <span className="jmii-countdown__num">{pad(seconds)}</span>
        </div>
      </div>
    </section>
  );
}
