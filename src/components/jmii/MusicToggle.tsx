"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MUSIC_PREF_KEY = "jmii:music:on";

interface MusicToggleProps {
  playbackSrc?: string;
  enabled?: boolean;
}

export function MusicToggle({ playbackSrc, enabled }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [musicOn, setMusicOn] = useState(() => {
    try {
      if (typeof window === "undefined") return true;
      const stored = window.localStorage.getItem(MUSIC_PREF_KEY);
      if (stored === "0") return false;
      if (stored === "1") return true;
    } catch {
      // ignore storage errors (private mode, blocked, etc.)
    }
    return true;
  });

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

    if (!musicOn) {
      const existing = audioRef.current;
      if (existing) {
        existing.pause();
      }
      return;
    }

    const audio = ensureAudio();
    if (!audio) return;

    audio.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [enabled, playbackSrc, ensureAudio, musicOn]);

  if (!enabled || !playbackSrc) return null;

  const toggle = async () => {
    const audio = ensureAudio();
    if (!audio) return;

    const nextOn = !musicOn;
    setMusicOn(nextOn);
    try {
      window.localStorage.setItem(MUSIC_PREF_KEY, nextOn ? "1" : "0");
    } catch {
      // ignore storage errors
    }

    if (!nextOn) {
      audio.pause();
      setPlaying(false);
      return;
    }

    if (!playing) {
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
