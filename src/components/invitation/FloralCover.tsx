"use client";

import { useCallback, useEffect, useState } from "react";
import { FallingLeaves } from "@/components/shared/FallingLeaves";
import { FloralCorner } from "@/components/shared/FloralCorner";
import { FloralGardenBackground } from "@/components/shared/FloralGardenBackground";
import type { CoverCopy, WeddingCouple } from "@/types/wedding.types";

interface FloralCoverProps {
  couple: WeddingCouple;
  cover: CoverCopy;
  flowerImage: string;
  leavesImage: string;
  guestName?: string;
  onOpen: () => void;
}

function formatCoverDate(dateString: string) {
  const d = new Date(dateString);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${d.getDate()} . ${month} . ${d.getFullYear()}`;
}

const COVER_EXIT_MS = 900;

export function FloralCover({
  couple,
  cover,
  flowerImage,
  leavesImage,
  guestName,
  onOpen,
}: FloralCoverProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setHasEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const finishOpen = useCallback(() => {
    onOpen();
  }, [onOpen]);

  useEffect(() => {
    if (!isClosing) return;
    const timer = window.setTimeout(finishOpen, COVER_EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [isClosing, finishOpen]);

  const handleOpenClick = () => {
    if (isClosing) return;
    setIsClosing(true);
  };

  return (
    <div
      className={`hm-cover fixed inset-0 z-[100] flex items-center justify-center p-5 ${
        hasEntered ? "hm-cover--entered" : ""
      } ${isClosing ? "hm-cover--closing" : ""}`}
      aria-hidden={isClosing}
    >
      <div className="hm-cover-backdrop absolute inset-0" aria-hidden />

      <FallingLeaves leavesImage={leavesImage} position="absolute" />

      <FloralGardenBackground flowerImage={flowerImage} variant="cover" />

      <FloralCorner flowerImage={flowerImage} position="top-left" />
      <FloralCorner flowerImage={flowerImage} position="top-right" />
      <FloralCorner flowerImage={flowerImage} position="bottom-left" className="opacity-80" />
      <FloralCorner flowerImage={flowerImage} position="bottom-right" className="opacity-80" />

      <div
        className={`hm-cover-card relative z-10 w-full max-w-sm overflow-hidden rounded-lg px-8 py-12 text-center shadow-lg ${
          hasEntered ? "hm-cover-card--entered" : ""
        }`}
      >
        <div className="relative z-10 flex flex-col items-center gap-4">
          <h1 className="hm-display-couple text-hm-green leading-snug">
            <span className="block hm-cover-reveal hm-cover-reveal--1">{couple.groom}</span>
            <span className="block text-2xl sm:text-3xl font-medium my-2 hm-cover-reveal hm-cover-reveal--2">
              &
            </span>
            <span className="block hm-cover-reveal hm-cover-reveal--3">{couple.bride}</span>
          </h1>

          <span className="text-hm-green text-2xl font-display hm-cover-reveal hm-cover-reveal--4" aria-hidden>
            ❦
          </span>

          <p
            className="hm-body text-hm-green tracking-wide hm-cover-reveal hm-cover-reveal--5"
            suppressHydrationWarning
          >
            {formatCoverDate(couple.weddingDate)}
          </p>

          <p className="hm-script text-hm-green mt-2 hm-cover-reveal hm-cover-reveal--6">
            {cover.invitationLabel}
          </p>

          {guestName ? (
            <p className="hm-cover-guest text-hm-green hm-cover-reveal hm-cover-reveal--7">
              {guestName}
            </p>
          ) : null}

          <button
            type="button"
            onClick={handleOpenClick}
            disabled={isClosing}
            className={`hm-open-btn relative z-10 mt-6 rounded-full px-10 py-3 hm-body-sm font-semibold tracking-widest uppercase transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none hm-cover-reveal ${
              guestName ? "hm-cover-reveal--8" : "hm-cover-reveal--7"
            }`}
          >
            {cover.openButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
