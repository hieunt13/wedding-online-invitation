"use client";

import { useState } from "react";
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

  const scaleStyle = baseFontSizeStyle(config.typography);

  return (
    <div style={scaleStyle}>
      <JmiiCover
        couple={config.couple}
        cover={config.cover}
        guestName={guestName}
        visible={!opened}
        onOpen={() => setOpened(true)}
      />

      <div className={opened ? "jmii-experience--open" : "jmii-experience--closed"}>
        {opened ? <JmiiInvitation config={config} guestName={guestName} /> : null}
      </div>
    </div>
  );
}
