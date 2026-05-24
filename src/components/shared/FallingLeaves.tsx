"use client";

import { useMemo } from "react";

interface FallingLeaf {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  drift: "a" | "b" | "c";
  opacity: number;
  rotate: number;
  flipX: boolean;
}

const LEAF_COUNT = 22;
const LEAF_SIZE_MIN = 32;
const LEAF_SIZE_RANGE = 32;
const DRIFTS = ["a", "b", "c"] as const;

/** Deterministic PRNG — same output on server and client (fixes hydration mismatch). */
function createSeededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function createLeaves(): FallingLeaf[] {
  const random = createSeededRandom(0x7ea5_2026);

  return Array.from({ length: LEAF_COUNT }, (_, id) => {
    const left = ((id * 4.7 + random() * 8) % 100).toFixed(2);
    const size = Math.round((LEAF_SIZE_MIN + random() * LEAF_SIZE_RANGE) * 100) / 100;
    const duration = Math.round((14 + random() * 16) * 100) / 100;
    const delay = Math.round(-random() * 25 * 100) / 100;

    return {
      id,
      left: `${left}%`,
      size,
      duration,
      delay,
      drift: DRIFTS[id % 3],
      opacity: Math.round((0.28 + random() * 0.32) * 1000) / 1000,
      rotate: Math.round(random() * 360 * 100) / 100,
      flipX: random() > 0.5,
    };
  });
}

/** Shared leaf layout — identical on SSR and hydration. */
const STATIC_LEAVES = createLeaves();

interface FallingLeavesProps {
  leavesImage: string;
  /** `fixed` = full viewport; `absolute` = inside cover container */
  position?: "fixed" | "absolute";
}

export function FallingLeaves({ leavesImage, position = "fixed" }: FallingLeavesProps) {
  const leaves = useMemo(() => STATIC_LEAVES, []);

  return (
    <div
      aria-hidden
      className={`falling-leaves pointer-events-none overflow-hidden ${
        position === "fixed" ? "falling-leaves--fixed" : "falling-leaves--absolute"
      }`}
    >
      {leaves.map((leaf) => (
        <span
          key={leaf.id}
          className={`falling-leaf falling-leaf--${leaf.drift}`}
          style={{
            left: leaf.left,
            width: leaf.size,
            height: leaf.size,
            opacity: leaf.opacity,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
          }}
        >
          <span
            className="falling-leaf__img"
            style={{
              backgroundImage: `url(${leavesImage})`,
              transform: `rotate(${leaf.rotate}deg)${leaf.flipX ? " scaleX(-1)" : ""}`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
