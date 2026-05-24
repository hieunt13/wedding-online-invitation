import { MaterialIcon } from "@/components/shared/MaterialIcon";
import { GlassCard } from "@/components/shared/GlassCard";
import type { StoryEvent } from "@/types/wedding.types";

interface StoryTimelineProps {
  events: StoryEvent[];
}

export function StoryTimeline({ events }: StoryTimelineProps) {
  return (
    <section className="py-section-gap px-margin-mobile bg-surface relative reveal-on-scroll">
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-1/4">
        <MaterialIcon icon="eco" className="text-[300px] text-primary" />
      </div>

      <div className="max-w-container-max mx-auto text-center mb-16">
        <h2 className="font-display-lg-mobile text-headline-md text-primary mb-4">
          Our Love Story
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mx-auto">
          From a simple hello to our forever after.
        </p>
      </div>

      <div className="relative timeline-line max-w-md mx-auto space-y-16">
        {events.map((event, index) => (
          <TimelineEvent key={index} event={event} />
        ))}
      </div>
    </section>
  );
}

interface TimelineEventProps {
  event: StoryEvent;
}

function TimelineEvent({ event }: TimelineEventProps) {
  return (
    <div className="relative z-10 flex flex-col items-center reveal-on-scroll">
      <div className="w-4 h-4 rounded-full bg-tertiary-fixed border-4 border-surface ring-2 ring-primary/10 mb-6" />
      <GlassCard>
        <span className="font-label-caps text-[10px] text-primary tracking-widest uppercase mb-2 block">
          {event.season}
        </span>
        <h3 className="font-headline-sm text-headline-sm text-primary mb-3">
          {event.title}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant italic">
          &quot;{event.description}&quot;
        </p>
      </GlassCard>
    </div>
  );
}
