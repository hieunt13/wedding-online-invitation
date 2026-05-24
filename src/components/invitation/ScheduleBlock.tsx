import type { ScheduleBlock as ScheduleBlockType } from "@/types/wedding.types";

interface ScheduleBlockProps {
  schedule: ScheduleBlockType;
}

export function ScheduleBlockSection({ schedule }: ScheduleBlockProps) {
  if (schedule.locationLine) {
    return (
      <section className="hm-section reveal-on-scroll reveal-delay-3 relative px-6 py-12 text-center">
        <p className="hm-body text-hm-green mb-6 tracking-wide">{schedule.locationLine}</p>

        {schedule.timeDetail && (
          <p className="hm-body-sm text-hm-green mb-8 tracking-wide">{schedule.timeDetail}</p>
        )}

        {schedule.dateDisplay && (
          <p className="hm-display-date text-hm-green mb-6">{schedule.dateDisplay}</p>
        )}

        {schedule.lunarDate && (
          <p className="hm-body text-hm-green tracking-wide">{schedule.lunarDate}</p>
        )}
      </section>
    );
  }

  return (
    <section className="hm-section reveal-on-scroll reveal-delay-3 relative px-6 py-12 text-center">
      <p className="hm-label text-hm-green mb-2">{schedule.locationLabel}</p>
      <p className="hm-display-venue text-hm-green mb-10">{schedule.location}</p>

      <p className="hm-label text-hm-green mb-2">{schedule.timeLabel}</p>
      <p className="hm-display-time text-hm-green mb-10">{schedule.time}</p>

      <div className="flex items-center justify-center gap-4 sm:gap-8 hm-body text-hm-green font-medium">
        <span className="hm-label">{schedule.dayOfWeek}</span>
        <span className="text-hm-green/30">|</span>
        <span className="hm-display-time leading-none">{schedule.day}</span>
        <span className="text-hm-green/30">|</span>
        <span className="hm-label">{schedule.month}</span>
      </div>

      <p className="hm-display-venue mt-4 tracking-widest">{schedule.year}</p>

      {schedule.lunarDate && (
        <p className="hm-body-sm text-hm-green mt-6 tracking-wide">{schedule.lunarDate}</p>
      )}
    </section>
  );
}
