"use client";

import { useRef, useState } from "react";

interface MusicToggleProps {
  src?: string;
  enabled?: boolean;
}

export function MusicToggle({ src, enabled }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  if (!enabled || !src) return null;

  const toggle = async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      await audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <button
      type="button"
      className="jmii-music-toggle"
      onClick={toggle}
      aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
    >
      {playing ? "♫" : "♪"}
    </button>
  );
}
