import type { FamilySide } from "@/types/wedding.types";

interface ParentsSectionProps {
  groomFamily: FamilySide;
  brideFamily: FamilySide;
}

export function ParentsSection({ groomFamily, brideFamily }: ParentsSectionProps) {
  return (
    <section className="hm-section reveal-on-scroll reveal-delay-1 relative px-6 pt-40 pb-10">
      <div className="hm-parents-grid mx-auto max-w-2xl">
        <p className="hm-parent-label text-hm-green text-center col-start-1 row-start-1 px-1">
          {groomFamily.label}
        </p>
        <div className="hm-parents-divider col-start-2 row-start-1 row-span-4" aria-hidden />
        <p className="hm-parent-label text-hm-green text-center col-start-3 row-start-1 px-1">
          {brideFamily.label}
        </p>

        <p className="hm-body text-hm-green text-center leading-snug tracking-wide col-start-1 row-start-2 px-1">
          {groomFamily.father}
        </p>
        <p className="hm-body text-hm-green text-center leading-snug tracking-wide col-start-3 row-start-2 px-1">
          {brideFamily.father}
        </p>

        <p className="hm-body text-hm-green text-center leading-snug tracking-wide col-start-1 row-start-3 px-1">
          {groomFamily.mother}
        </p>
        <p className="hm-body text-hm-green text-center leading-snug tracking-wide col-start-3 row-start-3 px-1">
          {brideFamily.mother}
        </p>

        <p className="hm-body-sm text-hm-green text-center leading-relaxed col-start-1 row-start-4 px-1">
          {groomFamily.address}
        </p>
        <p className="hm-body-sm text-hm-green text-center leading-relaxed col-start-3 row-start-4 px-1">
          {brideFamily.address}
        </p>
      </div>
    </section>
  );
}
