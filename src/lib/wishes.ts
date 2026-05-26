export interface WishItem {
  name: string;
  message: string;
}

export interface WishesResponse {
  wishes: WishItem[];
}

export function isWishItem(value: unknown): value is WishItem {
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.name === "string" &&
    typeof row.message === "string" &&
    row.message.trim().length > 0
  );
}

export function parseWishesResponse(body: unknown): WishItem[] {
  if (!body || typeof body !== "object") return [];
  const data = body as Record<string, unknown>;
  if (!Array.isArray(data.wishes)) return [];

  return data.wishes
    .filter(isWishItem)
    .map((wish) => ({
      name: wish.name.trim() || "Khách mời",
      message: wish.message.trim(),
    }));
}
