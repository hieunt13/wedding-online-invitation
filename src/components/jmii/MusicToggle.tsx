"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface MusicToggleProps {
  playbackSrc?: string;
  enabled?: boolean;
}

export function MusicToggle({ playbackSrc, enabled }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const ensureAudio = useCallback(() => {
    if (!playbackSrc) return null;
    if (!audioRef.current) {
      audioRef.current = new Audio(playbackSrc);
      audioRef.current.loop = true;
    }
    return audioRef.current;
  }, [playbackSrc]);

  useEffect(() => {
    if (!enabled || !playbackSrc) return;

    const audio = ensureAudio();
    if (!audio) return;

    audio.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [enabled, playbackSrc, ensureAudio]);

  if (!enabled || !playbackSrc) return null;

  const toggle = async () => {
    const audio = ensureAudio();
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
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
