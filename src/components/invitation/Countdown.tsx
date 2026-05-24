"use client";

import { useCountdown } from "@/hooks/useCountdown";

interface CountdownProps {
  targetDate: string;
}

export function Countdown({ targetDate }: CountdownProps) {
  const timeLeft = useCountdown(targetDate);

  return (
    <section className="hm-section reveal-on-scroll reveal-delay-6 relative px-6 py-14 text-center">
      <p className="hm-label text-hm-green mb-8">ĐẾM NGƯỢC</p>

      <div className="flex justify-center gap-6 sm:gap-10">
        <CountdownUnit value={timeLeft.days} label="Ngày" />
        <CountdownUnit value={timeLeft.hours} label="Giờ" />
        <CountdownUnit value={timeLeft.minutes} label="Phút" />
      </div>
    </section>
  );
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="hm-display-date text-hm-green tabular-nums">{String(value).padStart(2, "0")}</span>
      <span className="hm-label text-hm-green uppercase mt-1">{label}</span>
    </div>
  );
}
