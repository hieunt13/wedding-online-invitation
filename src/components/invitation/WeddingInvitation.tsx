"use client";

import { useState, useEffect } from "react";
import { CoupleSidePortraits } from "./CoupleSidePortraits";
import { FloralCover } from "./FloralCover";
import { FallingLeaves } from "@/components/shared/FallingLeaves";
import { FloralCorner } from "@/components/shared/FloralCorner";
import { FloralGardenBackground } from "@/components/shared/FloralGardenBackground";
import { ParentsSection } from "./ParentsSection";
import { AnnouncementSection } from "./AnnouncementSection";
import { ScheduleBlockSection } from "./ScheduleBlock";
import { PhotoGallery } from "./PhotoGallery";
import { ReceptionSection } from "./ReceptionSection";
import { Countdown } from "./Countdown";
import { RSVPForm } from "./RSVPForm";
import { Footer } from "./Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getTypographyStyleVars } from "@/lib/typography";
import type { WeddingConfig } from "@/types/wedding.types";

interface WeddingInvitationProps {
  config: WeddingConfig;
  guestName?: string;
}

export function WeddingInvitation({ config, guestName }: WeddingInvitationProps) {
  const [isOpened, setIsOpened] = useState(false);

  useScrollReveal(isOpened);

  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpened]);

  const highlightDay = parseInt(config.ceremony.day, 10) || 24;
  const flowerImage = config.theme.flowerImage;
  const leavesImage = config.theme.leavesImage;
  const portraits = config.images.couplePortraits;

  return (
    <div
      className="theme-hoa-moc-xanh min-h-full"
      style={getTypographyStyleVars(config.typography)}
    >
      {isOpened && <FallingLeaves leavesImage={leavesImage} position="fixed" />}

      {!isOpened && (
        <FloralCover
          couple={config.couple}
          cover={config.cover}
          flowerImage={flowerImage}
          leavesImage={leavesImage}
          guestName={guestName}
          onOpen={() => setIsOpened(true)}
        />
      )}

      {isOpened && (
        <>
          {portraits && (
            <CoupleSidePortraits
              groomImage={portraits.groom}
              brideImage={portraits.bride}
              groomName={config.couple.groom}
              brideName={config.couple.bride}
            />
          )}

          <main className="scrolling-content active hm-page hm-page--enter relative w-full">
            <div className="hm-page-bg pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
              <FloralGardenBackground flowerImage={flowerImage} variant="page" />
              <FloralCorner
                flowerImage={flowerImage}
                position="top-left"
                className="opacity-70 hm-floral-corner--page"
              />
              <FloralCorner
                flowerImage={flowerImage}
                position="top-right"
                className="opacity-70 hm-floral-corner--page"
              />
            </div>

            <div className="hm-page-content relative z-[2]">
              <ParentsSection groomFamily={config.families.groom} brideFamily={config.families.bride} />

              <AnnouncementSection announcement={config.announcement} couple={config.couple} />

              <ScheduleBlockSection schedule={config.ceremony} />

              <PhotoGallery
                images={config.images.gallery}
                moreCount={config.images.galleryMoreCount}
              />

              <ReceptionSection reception={config.reception} highlightDay={highlightDay} />

              <Countdown targetDate={config.couple.weddingDate} />

              <RSVPForm deadline={config.rsvp.deadline} fields={config.rsvp.fields} />

              <Footer
                bride={config.couple.bride}
                groom={config.couple.groom}
                date={config.couple.weddingDate}
                flowerImage={flowerImage}
              />
            </div>
          </main>
        </>
      )}
    </div>
  );
}
