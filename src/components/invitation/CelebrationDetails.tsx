import { MaterialIcon } from "@/components/shared/MaterialIcon";
import type { CelebrationEvent } from "@/types/wedding.types";

interface CelebrationDetailsProps {
  events: CelebrationEvent[];
}

export function CelebrationDetails({ events }: CelebrationDetailsProps) {
  return (
    <section className="celebration-section py-section-gap px-margin-mobile overflow-hidden relative">
      <div className="text-center mb-16">
        <h2 className="font-display-lg-mobile text-headline-md mb-2">
          The Celebration
        </h2>
        <div className="flex items-center justify-center gap-2">
          <div className="h-px w-8 bg-white/20" />
          <MaterialIcon icon="celebration" className="footer-icon" />
          <div className="h-px w-8 bg-white/20" />
        </div>
      </div>

      <div className="grid gap-gutter max-w-md mx-auto">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </section>
  );
}

interface EventCardProps {
  event: CelebrationEvent;
}

function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="event-card-title font-headline-sm text-headline-sm">
          {event.title}
        </h3>
        <MaterialIcon icon={event.icon} className="text-white/50" />
      </div>

      <div className="space-y-1">
        <p className="font-body-lg text-body-lg">{event.time}</p>
        <p className="event-card-meta font-body-md text-body-md">{event.location}</p>
      </div>

      <button className="event-card-button w-full py-3 border rounded-lg font-label-caps text-label-caps tracking-widest transition-all flex items-center justify-center gap-2">
        <MaterialIcon
          icon={event.type === "ceremony" ? "map" : "directions_car"}
          className="text-sm"
        />
        {event.mapAction}
      </button>
    </div>
  );
}
