"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CoverCopy, WeddingCouple } from "@/types/wedding.types";

type OpenPhase = "idle" | "flap" | "lift" | "exit";

const PHASE_MS: Record<Exclude<OpenPhase, "idle">, number> = {
  flap: 4000,
  lift: 4000,
  exit: 800,
};

interface JmiiCoverProps {
  couple: WeddingCouple;
  cover: CoverCopy;
  guestName?: string;
  waxSealSrc?: string;
  onOpenStart?: () => void;
  onOpenComplete: () => void;
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
  waxSealSrc,
  onOpenStart,
  onOpenComplete,
  visible,
}: JmiiCoverProps) {
  const [phase, setPhase] = useState<OpenPhase>("idle");
  const completedRef = useRef(false);

  const floral = cover.floral ?? "/images/flower.png";
  const backgroundImage = cover.backgroundImage ?? "/images/idle-bg.png";
  const isAnimating = phase !== "idle";

  const handleOpen = useCallback(() => {
    if (phase !== "idle" || completedRef.current) return;
    setPhase("flap");
    onOpenStart?.();
  }, [phase, onOpenStart]);

  useEffect(() => {
    if (phase === "idle") return;

    const nextPhase: Partial<Record<OpenPhase, OpenPhase>> = {
      flap: "lift",
      lift: "exit",
    };

    const delay = PHASE_MS[phase as Exclude<OpenPhase, "idle">];
    const timer = window.setTimeout(() => {
      if (phase === "exit") {
        if (!completedRef.current) {
          completedRef.current = true;
          onOpenComplete();
        }
        setPhase("idle");
        return;
      }
      const next = nextPhase[phase];
      if (next) setPhase(next);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [phase, onOpenComplete]);

  if (!visible && !isAnimating) return null;

  return (
    <div
      className={`jmii-cover${isAnimating ? " jmii-cover--opening" : ""}`}
      aria-hidden={!visible && isAnimating}
    >
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

      <div className="jmii-cover__stage">
        <div
          className={`jmii-cover-env jmii-cover-env--${phase}`}
          role="button"
          tabIndex={phase === "idle" ? 0 : -1}
          aria-label={cover.openButtonText}
          onClick={handleOpen}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleOpen();
            }
          }}
        >
          <div className="jmii-cover-env__scene">
            <div className="jmii-cover-env__back" aria-hidden />
            <div className="jmii-cover-env__inner" aria-hidden />

            <div className="jmii-cover-env__card">
              <div className="jmii-cover-env__card-inner">
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
                <p className="jmii-cover__guest">{guestName ?? "Khách mời"}</p>
              </div>
            </div>

            <div className="jmii-cover-env__front" aria-hidden>
              <p className="jmii-cover-env__front-names">
                {couple.groom} &amp; {couple.bride}
              </p>
            </div>

            <div className="jmii-cover-env__flap-hinge" aria-hidden>
              <div className="jmii-cover-env__flap" />
              <div className="jmii-cover-env__seal">
                {waxSealSrc ? (
                  <Image
                    src={waxSealSrc}
                    alt=""
                    width={56}
                    height={56}
                    className="jmii-cover-env__seal-img"
                    priority
                  />
                ) : (
                  <span className="jmii-cover-env__seal-fallback" />
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="jmii-cover__hint">{cover.openButtonText}</p>
      </div>
    </div>
  );
}
