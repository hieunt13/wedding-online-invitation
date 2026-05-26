const DEFAULT_MUSIC_FILE = "/audio/wedding-music.mp3";

const YOUTUBE_HOST_PATTERN =
  /^(?:www\.)?(?:music\.)?youtube\.com|youtu\.be|m\.youtube\.com$/i;

export function isYoutubeMusicSource(src: string): boolean {
  try {
    const host = new URL(src).hostname.replace(/^www\./, "");
    return YOUTUBE_HOST_PATTERN.test(host);
  } catch {
    return false;
  }
}

/** URL phát nhạc trên trình duyệt (file local sau khi chạy download-music). */
export function resolveMusicPlaybackSrc(music?: {
  src?: string;
  file?: string;
}): string | undefined {
  if (!music?.src && !music?.file) return undefined;

  if (music.file?.trim()) return music.file.trim();

  const src = music.src?.trim() ?? "";
  if (!src) return DEFAULT_MUSIC_FILE;

  if (isYoutubeMusicSource(src)) return DEFAULT_MUSIC_FILE;

  return src;
}
