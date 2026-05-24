"use client";

import Image from "next/image";
import type { CoverCopy, WeddingCouple } from "@/types/wedding.types";

interface JmiiCoverProps {
  couple: WeddingCouple;
  cover: CoverCopy;
  guestName?: string;
  onOpen: () => void;
  visible: boolean;
}

function formatCoverDate(dateString: string) {
  const d = new Date(dateString);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}.${d.getFullYear()}`;
}

export function JmiiCover({
  couple,
  cover,
  guestName,
  onOpen,
  visible,
}: JmiiCoverProps) {
  if (!visible) return null;

  const floral = cover.floral ?? "/images/flower.png";
  const backgroundImage = cover.backgroundImage ?? "/images/idle-bg.png";

  return (
    <div className="jmii-cover" aria-hidden={!visible}>
      <div className="jmii-cover__bg" aria-hidden>
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="jmii-cover__bg-img"
          priority
        />
      </div>
      <div className="jmii-cover__backdrop" aria-hidden />
      <div className="jmii-cover__card">
        <div className="jmii-cover__flower jmii-cover__flower--tl" aria-hidden>
          <Image
            src={floral}
            alt=""
            width={136}
            height={136}
            className="jmii-cover__flower-img"
            priority
          />
        </div>
        <div className="jmii-cover__flower jmii-cover__flower--br" aria-hidden>
          <Image
            src={floral}
            alt=""
            width={136}
            height={136}
            className="jmii-cover__flower-img"
            priority
          />
        </div>


        <div className="jmii-cover__couple">
          <p className="jmii-cover__name">{couple.groom}</p>
          <span className="jmii-cover__amp">&</span>
          <p className="jmii-cover__name">{couple.bride}</p>
        </div>

        <p className="jmii-cover__date">{formatCoverDate(couple.weddingDate)}</p>

        <p className="jmii-cover__label">{cover.invitationLabel}</p>

        <p className="jmii-cover__guest">{guestName ?? 'Khách mời'}</p>

        <button type="button" className="jmii-cover__open" onClick={onOpen}>
          {cover.openButtonText}
        </button>
      </div>
    </div>
  );
}
