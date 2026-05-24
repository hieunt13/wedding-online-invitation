import type { AnnouncementCopy, WeddingCouple } from "@/types/wedding.types";

interface AnnouncementSectionProps {
  announcement: AnnouncementCopy;
  couple: WeddingCouple;
}

export function AnnouncementSection({ announcement, couple }: AnnouncementSectionProps) {
  return (
    <section className="hm-section reveal-on-scroll reveal-delay-2 relative px-6 py-12 text-center">
      <p className="hm-label text-hm-green mb-3">{announcement.heading}</p>
      <p className="hm-body text-hm-green mb-10 tracking-wide">{announcement.subheading}</p>

      <div className="max-w-md mx-auto space-y-4">
        <p className="hm-display-couple text-hm-green">{couple.groom}</p>
        <span className="inline-block font-display text-hm-green/70 text-2xl sm:text-3xl font-semibold">
          &
        </span>
        <p className="hm-display-couple text-hm-green">{couple.bride}</p>
        {couple.relationshipLine && (
          <p className="hm-body text-hm-green pt-4 tracking-wide">{couple.relationshipLine}</p>
        )}
      </div>
    </section>
  );
}
