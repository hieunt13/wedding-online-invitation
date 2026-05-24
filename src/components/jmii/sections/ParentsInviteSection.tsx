import type { EventConfig, FamilySide } from "@/types/wedding.types";

interface ParentsInviteSectionProps {
  families: { groom: FamilySide; bride: FamilySide };
  event: EventConfig;
  groomName: string;
  brideName: string;
  flowerImage?: string;
}

export function ParentsInviteSection({
  families,
  event,
  groomName,
  brideName,
  flowerImage,
}: ParentsInviteSectionProps) {
  return (
    <section className="jmii-section jmii-parents reveal-on-scroll">
      <div className="jmii-parents__cols">
        <div className="jmii-parents__col">
          <p className="jmii-label-sm">{families.groom.label}</p>
          <p>
            {families.groom.fatherTitle} {families.groom.father}
          </p>
          <p>
            {families.groom.motherTitle} {families.groom.mother}
          </p>
        </div>
        <div className="jmii-parents__col">
          <p className="jmii-label-sm">{families.bride.label}</p>
          <p>
            {families.bride.fatherTitle} {families.bride.father}
          </p>
          <p>
            {families.bride.motherTitle} {families.bride.mother}
          </p>
        </div>
      </div>

      <p className="jmii-invite-line reveal-on-scroll">{event.invitationLine}</p>

      {flowerImage ? (
        <div
          className="jmii-parents__floral reveal-on-scroll"
          style={{ backgroundImage: `url(${flowerImage})` }}
          aria-hidden
        />
      ) : null}

      <div className="jmii-couple-names reveal-on-scroll">
        <p className="jmii-couple-names__groom">{groomName}</p>
        <span className="jmii-couple-names__amp">&</span>
        <p className="jmii-couple-names__bride">{brideName}</p>
      </div>
    </section>
  );
}
