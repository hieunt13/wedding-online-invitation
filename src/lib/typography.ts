import type { CSSProperties } from "react";
import type { TypographyConfig } from "@/types/wedding.types";

/** Reference size — all typography scales relative to this (16px). */
export const TYPOGRAPHY_REFERENCE_PX = 16;

export const DEFAULT_BASE_FONT_SIZE = 20;

export function resolveFontScale(typography?: TypographyConfig): number {
  const base = typography?.baseFontSize ?? DEFAULT_BASE_FONT_SIZE;
  return base / TYPOGRAPHY_REFERENCE_PX;
}

export function getTypographyStyleVars(typography?: TypographyConfig): CSSProperties {
  const scale = resolveFontScale(typography);
  return {
    "--hm-font-scale": String(scale),
    "--jmii-font-scale": String(scale),
  } as CSSProperties;
}

export function baseFontSizeStyle(typography?: TypographyConfig): CSSProperties {
  return getTypographyStyleVars(typography);
}
