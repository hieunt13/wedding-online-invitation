"use client";

import { useCallback, useEffect, useSyncExternalStore, useState } from "react";
import { InvitationBackdrop } from "@/components/jmii/InvitationBackdrop";
import { JmiiCover } from "@/components/jmii/JmiiCover";
import { JmiiInvitation } from "@/components/jmii/JmiiInvitation";
import { getAuthorLabel } from "@/lib/author-label";
import { baseFontSizeStyle } from "@/lib/typography";
import type { WishItem } from "@/lib/wishes";
import type { WeddingConfig } from "@/types/wedding.types";

const GUEST_NAME_KEY = "jmii:guestName";
const GUEST_NAME_EVENT = "jmii:guestName:changed";

interface WeddingExperienceProps {
  config: WeddingConfig;
  guestName?: string;
  wishes?: WishItem[];
}

function subscribeGuestNameStore(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener(GUEST_NAME_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(GUEST_NAME_EVENT, handler);
  };
}

function getGuestNameSnapshot() {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(GUEST_NAME_KEY) ?? "";
  } catch {
    return "";
  }
}

export function WeddingExperience({ config, guestName, wishes = [] }: WeddingExperienceProps) {
  const [opened, setOpened] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const storedGuestName = useSyncExternalStore(
    subscribeGuestNameStore,
    getGuestNameSnapshot,
    () => "",
  );
  const effectiveGuestName = guestName ?? (storedGuestName || undefined);

  const handleOpenStart = useCallback(() => {
    setRevealing(true);
  }, []);

  const handleOpenComplete = useCallback(() => {
    setOpened(true);
    setRevealing(false);
  }, []);

  useEffect(() => {
    if (!guestName?.trim()) return;
    try {
      window.localStorage.setItem(GUEST_NAME_KEY, guestName.trim());
      window.dispatchEvent(new Event(GUEST_NAME_EVENT));
    } catch {
      // ignore storage errors
    }
  }, [guestName]);

  const scaleStyle = baseFontSizeStyle(config.typography);
  const showInvitation = opened || revealing;
  const authorLabel = getAuthorLabel(config);

  return (
    <div style={scaleStyle}>
      <JmiiCover
        couple={config.couple}
        cover={config.cover}
        guestName={effectiveGuestName}
        waxSealSrc={config.theme.heroWaxSeal}
        authorLabel={authorLabel}
        visible={!opened}
        onOpenStart={handleOpenStart}
        onOpenComplete={handleOpenComplete}
      />

      <div
        className={
          showInvitation
            ? `jmii-experience jmii-experience--open${revealing ? " jmii-experience--revealing" : ""}`
            : "jmii-experience jmii-experience--closed"
        }
      >
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
              guestName={effectiveGuestName}
              authorLabel={authorLabel}
              wishes={wishes}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
