import { parseWishesResponse, type WishItem } from "@/lib/wishes";

type FetchWishesResult =
  | { ok: true; wishes: WishItem[] }
  | { ok: false; reason: "missing_env" | "upstream_error" | "network_error" };

export async function fetchWishesFromSheets(): Promise<FetchWishesResult> {
  const webAppUrl = process.env.GOOGLE_SHEETS_WEB_APP_URL?.trim();

  if (!webAppUrl) {
    return { ok: false, reason: "missing_env" };
  }

  try {
    const upstream = await fetch(webAppUrl, {
      method: "GET",
      next: { revalidate: 60 },
    });

    const text = await upstream.text();
    let body: unknown = {};
    try {
      body = text ? JSON.parse(text) : {};
    } catch {
      body = {};
    }

    if (!upstream.ok) {
      return { ok: false, reason: "upstream_error" };
    }

    return { ok: true, wishes: parseWishesResponse(body) };
  } catch {
    return { ok: false, reason: "network_error" };
  }
}

export async function getWishes(): Promise<WishItem[]> {
  const result = await fetchWishesFromSheets();
  return result.ok ? result.wishes : [];
}
