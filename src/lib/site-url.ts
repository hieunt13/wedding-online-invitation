/** URL gốc của site (bắt buộc cho og:image khi chia sẻ link). */
export function getSiteUrl(): URL {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return new URL(configured.endsWith("/") ? configured : `${configured}/`);
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    return new URL(`https://${vercel}/`);
  }

  const port = process.env.PORT ?? "3002";
  return new URL(`http://localhost:${port}/`);
}

export function absoluteUrl(path: string, base = getSiteUrl()): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return new URL(path.startsWith("/") ? path : `/${path}`, base).toString();
}
