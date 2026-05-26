"use client";

import { useCallback, useState } from "react";
import { AuthorCredits } from "@/components/jmii/AuthorCredits";
import { InvitationBackdrop } from "@/components/jmii/InvitationBackdrop";
import { JmiiCover } from "@/components/jmii/JmiiCover";
import { JmiiInvitation } from "@/components/jmii/JmiiInvitation";
import { getAuthorLabel } from "@/lib/author-label";
import { baseFontSizeStyle } from "@/lib/typography";
import type { WishItem } from "@/lib/wishes";
import type { WeddingConfig } from "@/types/wedding.types";

interface WeddingExperienceProps {
  config: WeddingConfig;
  guestName?: string;
  wishes?: WishItem[];
}

export function WeddingExperience({ config, guestName, wishes = [] }: WeddingExperienceProps) {
  const [opened, setOpened] = useState(false);
  const [revealing, setRevealing] = useState(false);

  const handleOpenStart = useCallback(() => {
    setRevealing(true);
  }, []);

  const handleOpenComplete = useCallback(() => {
    setOpened(true);
    setRevealing(false);
  }, []);

  const scaleStyle = baseFontSizeStyle(config.typography);
  const showInvitation = opened || revealing;
  const authorLabel = getAuthorLabel(config);

  return (
    <div style={scaleStyle}>
      <JmiiCover
        couple={config.couple}
        cover={config.cover}
        guestName={guestName}
        waxSealSrc={config.theme.heroWaxSeal}
        authorLabel={authorLabel}
        visible={!opened}
        onOpenStart={handleOpenStart}
        onOpenComplete={handleOpenComplete}
      />

      <div className={showInvitation ? "jmii-experience jmii-experience--open" : "jmii-experience jmii-experience--closed"}>
        {showInvitation ? (
          <>
            {(config.theme.invitationBackgroundImage ?? config.cover.backgroundImage) ? (
              <InvitationBackdrop
                src={
                  config.theme.invitationBackgroundImage ??
                  config.cover.backgroundImage ??
                  "/images/pre-wedding1.jpg"
                }
              />
            ) : null}
            <JmiiInvitation
              config={config}
              guestName={guestName}
              authorLabel={authorLabel}
              wishes={wishes}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
