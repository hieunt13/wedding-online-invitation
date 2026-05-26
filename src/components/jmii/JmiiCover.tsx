"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { AuthorCredits } from "@/components/jmii/AuthorCredits";
import type { CoverCopy, WeddingCouple } from "@/types/wedding.types";

type OpenPhase = "idle" | "flap" | "peek" | "lift" | "exit";

/** Thời gian mỗi phase — đồng bộ với CSS var `--jmii-cover-phase-*` */
const PHASE_MS: Record<Exclude<OpenPhase, "idle">, number> = {
  flap: 4200,
  peek: 2400,
  lift: 4800,
  exit: 300,
};

const COVER_OUT_DELAY_MS = PHASE_MS.flap + PHASE_MS.peek + PHASE_MS.lift - 600;

interface JmiiCoverProps {
  couple: WeddingCouple;
  cover: CoverCopy;
  guestName?: string;
  waxSealSrc?: string;
  onOpenStart?: () => void;
  onOpenComplete: () => void;
  visible: boolean;
  authorLabel?: string;
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
  authorLabel,
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
      flap: "peek",
      peek: "lift",
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

  const coverMotionStyle = {
    "--jmii-cover-phase-flap": `${PHASE_MS.flap}ms`,
    "--jmii-cover-phase-peek": `${PHASE_MS.peek}ms`,
    "--jmii-cover-phase-lift": `${PHASE_MS.lift}ms`,
    "--jmii-cover-phase-exit": `${PHASE_MS.exit}ms`,
    "--jmii-cover-out-delay": `${COVER_OUT_DELAY_MS}ms`,
    "--jmii-cover-out-duration": `${PHASE_MS.exit}ms`,
  } as CSSProperties;

  return (
    <div
      className={`jmii-cover${isAnimating ? " jmii-cover--opening" : ""}`}
      style={coverMotionStyle}
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

      {authorLabel ? <AuthorCredits label={authorLabel} zone="cover" /> : null}
    </div>
  );
}
