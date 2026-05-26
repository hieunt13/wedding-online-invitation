"use client";

import { useCallback, useState } from "react";
import { JmiiCover } from "@/components/jmii/JmiiCover";
import { JmiiInvitation } from "@/components/jmii/JmiiInvitation";
import { baseFontSizeStyle } from "@/lib/typography";
import type { WeddingConfig } from "@/types/wedding.types";

interface WeddingExperienceProps {
  config: WeddingConfig;
  guestName?: string;
}

export function WeddingExperience({ config, guestName }: WeddingExperienceProps) {
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

  return (
    <div style={scaleStyle}>
      <JmiiCover
        couple={config.couple}
        cover={config.cover}
        guestName={guestName}
        waxSealSrc={config.theme.heroWaxSeal}
        visible={!opened}
        onOpenStart={handleOpenStart}
        onOpenComplete={handleOpenComplete}
      />

      <div className={showInvitation ? "jmii-experience--open" : "jmii-experience--closed"}>
        {showInvitation ? <JmiiInvitation config={config} guestName={guestName} /> : null}
      </div>
    </div>
  );
}
